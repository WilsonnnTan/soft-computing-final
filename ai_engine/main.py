from __future__ import annotations

import os
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.concurrency import run_in_threadpool
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from inference import get_model_path, load_model, predict_image_bytes


class ProbabilityResponse(BaseModel):
    negative: float
    neutral: float
    positive: float


class PredictionResponse(BaseModel):
    label: str
    fis_score: float
    cnn_prediction_name: str
    probabilities: ProbabilityResponse


def get_allowed_origins() -> list[str]:
    configured_origins = os.getenv("AI_ENGINE_ALLOWED_ORIGINS", "")
    if configured_origins.strip():
        return [origin.strip() for origin in configured_origins.split(",") if origin.strip()]

    return [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]


@asynccontextmanager
async def lifespan(_: FastAPI):
    yield


app = FastAPI(
    title="Soft Computing AI Engine",
    description="FastAPI service for CNN + FIS image sentiment inference.",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    model_path = get_model_path()
    return {
        "status": "ok",
        "model_exists": model_path.exists(),
        "model_loaded": load_model.cache_info().currsize > 0,
        "model_path": str(model_path),
    }


@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="The uploaded file must be an image.")

    image_bytes = await file.read()
    await file.close()

    if not image_bytes:
        raise HTTPException(status_code=400, detail="The uploaded image file is empty.")

    try:
        prediction = await run_in_threadpool(predict_image_bytes, image_bytes)
    except FileNotFoundError as error:
        raise HTTPException(status_code=500, detail=str(error)) from error
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed to run: {error}",
        ) from error

    return PredictionResponse.model_validate(prediction)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
