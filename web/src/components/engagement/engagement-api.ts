const DEFAULT_AI_ENGINE_URL = 'http://127.0.0.1:8000';

export type EngagementLabel = 'Negative' | 'Neutral' | 'Positive';

export interface EngagementProbabilities {
  negative: number;
  neutral: number;
  positive: number;
}

export interface EngagementAnalysisResult {
  cnnLabel: EngagementLabel;
  fisScore: number;
  label: EngagementLabel;
  probabilities: EngagementProbabilities;
}

interface AiEnginePredictionResponse {
  cnn_prediction_name: EngagementLabel;
  fis_score: number;
  label: EngagementLabel;
  probabilities: EngagementProbabilities;
}

interface AiEngineErrorResponse {
  detail?: string;
}

export function getAiEngineBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_AI_ENGINE_URL?.trim().replace(/\/+$/, '') ||
    DEFAULT_AI_ENGINE_URL
  );
}

export async function analyzeEngagementImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${getAiEngineBaseUrl()}/predict`, {
    body: formData,
    method: 'POST',
  });

  const payload = await parseResponse(response);
  if (!response.ok) {
    const errorDetail =
      payload && !isPredictionResponse(payload) ? payload.detail : undefined;

    throw new Error(
      errorDetail ||
        'AI engine gagal memproses gambar. Pastikan service FastAPI sedang berjalan.',
    );
  }

  if (!payload || !isPredictionResponse(payload)) {
    throw new Error(
      'AI engine tidak mengembalikan bentuk respons prediksi yang valid.',
    );
  }

  return {
    cnnLabel: payload.cnn_prediction_name,
    fisScore: payload.fis_score,
    label: payload.label,
    probabilities: payload.probabilities,
  } satisfies EngagementAnalysisResult;
}

async function parseResponse(response: Response) {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as
      | AiEnginePredictionResponse
      | AiEngineErrorResponse;
  } catch {
    throw new Error(
      `AI engine mengembalikan respons yang tidak valid: ${text}`,
    );
  }
}

function isPredictionResponse(
  payload: AiEnginePredictionResponse | AiEngineErrorResponse,
): payload is AiEnginePredictionResponse {
  return (
    'cnn_prediction_name' in payload &&
    'fis_score' in payload &&
    'label' in payload &&
    'probabilities' in payload
  );
}
