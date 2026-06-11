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
      'The analysis request could not be sent. Make sure the web app and AI engine are running, then try again.',
    );
  }

  const payload = await parseResponse(response);
  if (!response.ok) {
    const errorDetail =
      payload && !isPredictionResponse(payload) ? payload.detail : undefined;

    throw new Error(
      errorDetail ||
        'The AI engine could not process this image. Make sure the FastAPI service is running.',
    );
  }

  if (!payload || !isPredictionResponse(payload)) {
    throw new Error(
      'The AI engine did not return a valid prediction response.',
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
    throw new Error(`The AI engine returned an invalid response: ${text}`);
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
