'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, FileImage, Upload, X } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useId } from 'react';

interface UploadSectionProps {
  disabled: boolean;
  error: string | null;
  loading: boolean;
  onFileSelect: (file: File | null) => void;
  onProcess: () => void;
  selectedFile: File | null;
}

const FORMATS = ['PNG', 'JPG', 'WEBP', 'GIF', 'HEIC', 'AVIF', 'SVG', 'BMP'];
const BYTES_PER_MEGABYTE = 1024 * 1024;

export function UploadSection({
  disabled,
  error,
  loading,
  onFileSelect,
  onProcess,
  selectedFile,
}: UploadSectionProps) {
  const inputId = useId();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    onFileSelect(e.currentTarget.files?.[0] ?? null);
    e.currentTarget.value = '';
  }

  function handleRemoveFile() {
    onFileSelect(null);
  }

  function formatFileSize(size: number) {
    return `${(size / BYTES_PER_MEGABYTE).toFixed(2)} MB`;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Card header */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ig-gradient">
          <Upload className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-card-foreground">Upload Image</p>
          <p className="text-xs text-muted-foreground">
            Choose one image from your device, then run the analysis.
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="space-y-4 p-6">
        {/* File uploader */}
        <div className="ig-gradient-border flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-transparent px-6 py-8 text-center transition-all duration-200">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
            <Upload className="h-6 w-6 text-purple-500" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <Button
              asChild
              size="lg"
              className="ig-gradient h-auto cursor-pointer rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-300"
            >
              <Label htmlFor={inputId} className="cursor-pointer">
                Click to choose a file
              </Label>
            </Button>
            <p className="mt-1 text-xs text-muted-foreground">
              All common image formats are supported
            </p>
          </div>

          <Input
            id={inputId}
            type="file"
            accept="image/*,.png,.jpg,.jpeg,.gif,.webp,.bmp,.svg,.avif,.heic,.heif"
            disabled={loading}
            onChange={handleInputChange}
            className="sr-only"
          />
        </div>

        {/* Format chips */}
        <div className="flex flex-wrap gap-2">
          {FORMATS.map((fmt) => (
            <span
              key={fmt}
              className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-semibold text-purple-700"
            >
              {fmt}
            </span>
          ))}
        </div>

        {/* Selected file indicator */}
        {selectedFile && (
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
              <FileImage className="h-4 w-4 text-green-700" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-green-900">
                {selectedFile.name}
              </p>
              <p className="text-xs font-medium text-green-700">
                {formatFileSize(selectedFile.size)} · Ready to analyze
              </p>
            </div>
            <CheckCircle2 className="hidden h-4 w-4 flex-shrink-0 text-green-600 sm:block" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={loading}
              onClick={handleRemoveFile}
              aria-label="Remove file"
              className="h-8 w-8 text-green-700 hover:bg-green-100 hover:text-green-900"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}

        {/* CTA button */}
        <Button
          onClick={onProcess}
          disabled={disabled}
          size="lg"
          className="ig-gradient h-auto w-full rounded-full py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-300 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          {loading ? '⏳ Processing...' : '✨ Analyze Image'}
        </Button>

        {loading && (
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="ig-gradient h-full animate-pulse rounded-full"
              style={{ width: '70%' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
