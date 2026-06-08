const ANALYZE_ENGAGEMENT_ROUTE = '/api/engagement/predict';

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

export async function analyzeEngagementImage(file: File) {
  const formData = new FormData();
  formData.append('file', file, file.name);

  let response: Response;
  try {
    response = await fetch(ANALYZE_ENGAGEMENT_ROUTE, {
      body: formData,
      method: 'POST',
    });
  } catch {
    throw new Error(
      'Permintaan analisis gagal dikirim. Pastikan aplikasi web dan AI engine aktif lalu coba lagi.',
    );
  }

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
