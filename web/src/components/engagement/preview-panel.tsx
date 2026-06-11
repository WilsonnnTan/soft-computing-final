import { ImageIcon } from 'lucide-react';

interface PreviewPanelProps {
  preview: string | null;
}

export function PreviewPanel({ preview }: PreviewPanelProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ig-gradient">
          <ImageIcon className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-card-foreground">
            Image Preview
          </p>
          <p className="text-xs text-muted-foreground">Your selected image</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {preview ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element -- Browser blob URLs from selected files should render directly. */}
            <img
              src={preview}
              alt="Preview of the selected image"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <ImageIcon className="h-5 w-5 text-muted-foreground/50" />
            </div>
            <p className="text-sm text-muted-foreground">
              The preview will appear
              <br />
              after you choose a file
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
