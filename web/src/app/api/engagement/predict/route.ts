import { NextResponse } from 'next/server';

const DEFAULT_AI_ENGINE_URL = 'http://localhost:8000';
const IMAGE_CONTENT_TYPES_BY_EXTENSION: Record<string, string> = {
  avif: 'image/avif',
  bmp: 'image/bmp',
  gif: 'image/gif',
  heic: 'image/heic',
  heif: 'image/heif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
};

function getAiEngineBaseUrl() {
  return (
    process.env.AI_ENGINE_URL?.trim().replace(/\/+$/, '') ||
    process.env.NEXT_PUBLIC_AI_ENGINE_URL?.trim().replace(/\/+$/, '') ||
    DEFAULT_AI_ENGINE_URL
  );
}

function getImageContentType(file: File) {
  if (file.type.startsWith('image/')) {
    return file.type;
  }

  const extension = file.name.split('.').pop()?.toLowerCase();
  return extension ? IMAGE_CONTENT_TYPES_BY_EXTENSION[extension] : undefined;
}

export async function POST(request: Request) {
  const incomingFormData = await request.formData();
  const file = incomingFormData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json(
      { detail: 'The upload must include exactly one image file.' },
      { status: 400 },
    );
  }

  const aiEngineBaseUrl = getAiEngineBaseUrl();
  const contentType = getImageContentType(file);

  if (!contentType) {
    return NextResponse.json(
      { detail: 'The uploaded file must be an image.' },
      { status: 400 },
    );
  }

  const fileForAiEngine =
    file.type === contentType
      ? file
      : new File([file], file.name, { type: contentType });

  const formData = new FormData();
  formData.append('file', fileForAiEngine, fileForAiEngine.name);

  let response: Response;
  try {
    response = await fetch(`${aiEngineBaseUrl}/predict`, {
      body: formData,
      cache: 'no-store',
      method: 'POST',
    });
  } catch {
    return NextResponse.json(
      {
        detail: `The AI engine could not be reached at ${aiEngineBaseUrl}. Make sure the FastAPI service is running, then try again.`,
      },
      { status: 502 },
    );
  }

  const responseText = await response.text();
  const responseContentType = response.headers.get('content-type') ?? '';

  if (responseContentType.includes('application/json')) {
    if (!responseText) {
      return NextResponse.json(null, { status: response.status });
    }

    try {
      return NextResponse.json(JSON.parse(responseText), {
        status: response.status,
      });
    } catch {
      return NextResponse.json(
        {
          detail: `The AI engine returned invalid JSON: ${responseText}`,
        },
        { status: 502 },
      );
    }
  }

  return new NextResponse(responseText, {
    headers: {
      'cache-control': 'no-store',
      'content-type': responseContentType || 'text/plain; charset=utf-8',
    },
    status: response.status,
  });
}
