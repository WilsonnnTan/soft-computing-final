'use client';

import { useEffect, useRef, useState } from 'react';

import {
  type EngagementAnalysisResult,
  analyzeEngagementImage,
} from './engagement-api';
import { PreviewPanel } from './preview-panel';
import { ResultPanel } from './result-panel';
import { UploadSection } from './upload-section';

const IMAGE_FILE_PATTERN = /\.(png|jpe?g|gif|webp|bmp|svg|avif|heic|heif)$/i;
const DEFAULT_ANALYSIS_ERROR =
  'AI engine gagal memproses gambar ini. Pastikan service FastAPI aktif lalu coba lagi.';

export function EngagementWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<EngagementAnalysisResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  function onFileSelect(selectedFile: File | null) {
    setResult(null);
    setUploadError(null);
    setAnalysisError(null);

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      return;
    }

    const isImage =
      selectedFile.type.startsWith('image/') ||
      IMAGE_FILE_PATTERN.test(selectedFile.name);

    if (isImage) {
      const objectUrl = URL.createObjectURL(selectedFile);
      previewUrlRef.current = objectUrl;
      setFile(selectedFile);
      setPreview(objectUrl);
      return;
    }

    setFile(null);
    setPreview(null);
    setUploadError('Pilih file gambar yang valid ya — JPG, PNG, WEBP, dll.');
  }

  async function onProcess() {
    if (!file) return;

    setLoading(true);
    setResult(null);
    setAnalysisError(null);

    try {
      const analysisResult = await analyzeEngagementImage(file);
      setResult(analysisResult);
    } catch (error: unknown) {
      console.error(error);
      setAnalysisError(
        error instanceof Error && error.message
          ? error.message
          : DEFAULT_ANALYSIS_ERROR,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <UploadSection
        disabled={!file || loading}
        error={uploadError ?? analysisError}
        loading={loading}
        onFileSelect={onFileSelect}
        onProcess={onProcess}
        selectedFile={file}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <PreviewPanel preview={preview} />
        <ResultPanel loading={loading} result={result} />
      </div>
    </>
  );
}
