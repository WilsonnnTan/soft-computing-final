from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Any

import cv2
import numpy as np
import skfuzzy as fuzz
import tensorflow as tf
from skfuzzy import control as ctrl

IMAGE_SIZE = (256, 256)
LABEL_TOKENS = ("neg", "neutral", "pos")
LABEL_MAP = {label: index for index, label in enumerate(LABEL_TOKENS)}
LABEL_NAMES = {
    LABEL_MAP["neg"]: "Negative",
    LABEL_MAP["neutral"]: "Neutral",
    LABEL_MAP["pos"]: "Positive",
}
NUM_CLASSES = len(LABEL_TOKENS)
MODEL_PATH = (
    Path(__file__).resolve().parent / "artifacts" / "cnn_fis_classifier.keras"
)


def get_model_path() -> Path:
    return MODEL_PATH.resolve()


@lru_cache(maxsize=1)
def load_model():
    model_path = get_model_path()
    if not model_path.exists():
        raise FileNotFoundError(
            f"Keras model not found at: {model_path}. "
            "Make sure the artifact file exists in ai_engine/artifacts."
        )

    return tf.keras.models.load_model(model_path)


def preprocess_image_bytes(image_bytes: bytes) -> np.ndarray:
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError(
            "The image could not be read. Make sure the uploaded file is a valid image."
        )

    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, IMAGE_SIZE, interpolation=cv2.INTER_AREA)
    image = image.astype(np.float32) / 255.0
    return image


def normalize_probability_vector(model_output: np.ndarray) -> np.ndarray:
    probabilities = np.asarray(model_output, dtype=np.float32).reshape(-1)

    if probabilities.shape[0] == NUM_CLASSES:
        return probabilities

    raise ValueError(
        f"Expected {NUM_CLASSES} class probabilities for "
        f"{', '.join(LABEL_TOKENS)}, received shape {probabilities.shape}."
    )


def probability_dict_from_vector(probability_vector: np.ndarray) -> dict[str, float]:
    probabilities = normalize_probability_vector(probability_vector)
    if probabilities.shape[0] != NUM_CLASSES:
        raise ValueError(
            f"Expected {NUM_CLASSES} class probabilities, received shape {probabilities.shape}."
        )

    return {
        "negative": float(probabilities[LABEL_MAP["neg"]]),
        "neutral": float(probabilities[LABEL_MAP["neutral"]]),
        "positive": float(probabilities[LABEL_MAP["pos"]]),
    }


def build_fuzzy_system() -> ctrl.ControlSystemSimulation:
    positive_confidence = ctrl.Antecedent(np.linspace(0, 1, 101), "positive_confidence")
    neutral_confidence = ctrl.Antecedent(np.linspace(0, 1, 101), "neutral_confidence")
    negative_confidence = ctrl.Antecedent(np.linspace(0, 1, 101), "negative_confidence")
    final_decision = ctrl.Consequent(np.linspace(0, 100, 101), "final_decision")

    for variable in (positive_confidence, neutral_confidence, negative_confidence):
        variable["low"] = fuzz.trimf(variable.universe, [0.0, 0.0, 0.45])
        variable["medium"] = fuzz.trimf(variable.universe, [0.2, 0.5, 0.8])
        variable["high"] = fuzz.trimf(variable.universe, [0.55, 1.0, 1.0])

    final_decision["negative"] = fuzz.trimf(final_decision.universe, [0, 0, 35])
    final_decision["neutral"] = fuzz.trimf(final_decision.universe, [30, 50, 70])
    final_decision["positive"] = fuzz.trimf(final_decision.universe, [65, 100, 100])

    rules = [
        ctrl.Rule(
            positive_confidence["high"]
            & neutral_confidence["low"]
            & negative_confidence["low"],
            final_decision["positive"],
        ),
        ctrl.Rule(
            positive_confidence["high"]
            & neutral_confidence["medium"]
            & negative_confidence["low"],
            final_decision["positive"],
        ),
        ctrl.Rule(
            positive_confidence["medium"]
            & neutral_confidence["low"]
            & negative_confidence["low"],
            final_decision["positive"],
        ),
        ctrl.Rule(
            negative_confidence["high"]
            & positive_confidence["low"]
            & neutral_confidence["low"],
            final_decision["negative"],
        ),
        ctrl.Rule(
            negative_confidence["high"]
            & positive_confidence["low"]
            & neutral_confidence["medium"],
            final_decision["negative"],
        ),
        ctrl.Rule(
            negative_confidence["medium"]
            & positive_confidence["low"]
            & neutral_confidence["low"],
            final_decision["negative"],
        ),
        ctrl.Rule(
            neutral_confidence["high"]
            & positive_confidence["low"]
            & negative_confidence["low"],
            final_decision["neutral"],
        ),
        ctrl.Rule(
            neutral_confidence["high"]
            & positive_confidence["medium"]
            & negative_confidence["low"],
            final_decision["neutral"],
        ),
        ctrl.Rule(
            neutral_confidence["high"]
            & negative_confidence["medium"]
            & positive_confidence["low"],
            final_decision["neutral"],
        ),
        ctrl.Rule(
            positive_confidence["medium"] & negative_confidence["medium"],
            final_decision["neutral"],
        ),
        ctrl.Rule(
            positive_confidence["medium"] & neutral_confidence["medium"],
            final_decision["neutral"],
        ),
        ctrl.Rule(
            negative_confidence["medium"] & neutral_confidence["medium"],
            final_decision["neutral"],
        ),
        ctrl.Rule(
            positive_confidence["high"] & negative_confidence["high"],
            final_decision["neutral"],
        ),
        ctrl.Rule(
            positive_confidence["low"]
            & negative_confidence["low"]
            & neutral_confidence["low"],
            final_decision["neutral"],
        ),
    ]

    control_system = ctrl.ControlSystem(rules)
    return ctrl.ControlSystemSimulation(control_system)


def fuzzy_label_from_probabilities(probability_vector: np.ndarray) -> tuple[str, float]:
    probabilities = probability_dict_from_vector(probability_vector)

    fuzzy_system = build_fuzzy_system()
    fuzzy_system.input["positive_confidence"] = probabilities["positive"]
    fuzzy_system.input["neutral_confidence"] = probabilities["neutral"]
    fuzzy_system.input["negative_confidence"] = probabilities["negative"]
    fuzzy_system.compute()

    decision_score = float(fuzzy_system.output["final_decision"])
    if decision_score >= 65:
        label = "Positive"
    elif decision_score <= 35:
        label = "Negative"
    else:
        label = "Neutral"

    return label, decision_score


def predict_image_bytes(image_bytes: bytes) -> dict[str, Any]:
    image = preprocess_image_bytes(image_bytes)
    model = load_model()

    batch = np.expand_dims(image, axis=0).astype(np.float32)
    model_output = np.asarray(model.predict(batch, verbose=0)[0], dtype=np.float32)
    probability_vector = normalize_probability_vector(model_output)
    probabilities = probability_dict_from_vector(probability_vector)
    fuzzy_label, fuzzy_score = fuzzy_label_from_probabilities(probability_vector)
    cnn_prediction_name = LABEL_NAMES[int(np.argmax(probability_vector))]

    return {
        "label": fuzzy_label,
        "fis_score": fuzzy_score,
        "cnn_prediction_name": cnn_prediction_name,
        "probabilities": probabilities,
    }
