import { ShieldCheck } from 'lucide-react';

export function WarningCard() {
  return (
    <div className="flex gap-4 rounded-2xl border border-orange-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F77737] to-[#FCAF45]">
        <ShieldCheck className="h-5 w-5 text-white" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-amber-900">
          Your image stays safe
        </p>
        <p className="text-sm leading-relaxed text-amber-800">
          The image you upload{' '}
          <strong>
            is sent only to our AI engine for analysis and is not stored
            permanently
          </strong>{' '}
          after the analysis finishes. The server processes the image only for
          prediction, not for long-term storage.
        </p>
      </div>
    </div>
  );
}
