# AI Engine

FastAPI inference service for the Soft Computing final project.

This service:

- accepts an image upload through an HTTP API,
- loads the trained Keras CNN model,
- preprocesses the image using the same `256x256` RGB normalization flow as the notebook,
- runs the CNN prediction,
- applies the same Fuzzy Inference System rules from the notebook, and
- returns the final label plus the raw class probabilities.

## Model Path

The service reads the trained model from:

```text
ai_engine/artifacts/cnn_fis_classifier.keras
```

## Install Dependencies

```powershell
cd ai_engine
uv sync
```

## Run the API

```powershell
cd ai_engine
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

```text
http://127.0.0.1:8000
```

## Endpoints

### `GET /health`

Returns service status plus model path information.

### `POST /predict`

Accepts one multipart file field named `file`.

Example with PowerShell:

```powershell
curl.exe -X POST "http://127.0.0.1:8000/predict" `
  -F "file=@C:\path\to\image.jpg"
```

Example response:

```json
{
  "label": "Positive",
  "fis_score": 82.34,
  "cnn_prediction_name": "Positive",
  "probabilities": {
    "negative": 0.07,
    "neutral": 0.11,
    "positive": 0.82
  }
}
```

## CORS

By default, the API allows requests from:

- `http://localhost:3000`
- `http://127.0.0.1:3000`

To override that list:

```powershell
$env:AI_ENGINE_ALLOWED_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"
```
