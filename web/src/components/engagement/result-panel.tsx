import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sparkles } from 'lucide-react';

import type { EngagementAnalysisResult } from './engagement-api';
import { ResultBadge } from './result-badge';

interface ResultPanelProps {
  loading: boolean;
  result: EngagementAnalysisResult | null;
}

export function ResultPanel({ loading, result }: ResultPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-4 text-muted-foreground" />
          Assessment result
        </CardTitle>
        <CardDescription>
          The engagement status will appear here after processing finishes.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        {result ? (
          <ResultBadge result={result} />
        ) : (
          <div className="rounded-lg border border-dashed bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
            {loading
              ? 'The AI engine is processing your image now.'
              : 'No result yet. Upload an image and click Process.'}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
