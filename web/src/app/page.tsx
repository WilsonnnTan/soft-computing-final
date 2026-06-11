import {
  EngagementWorkspace,
  PageHeader,
  WarningCard,
} from '@/components/engagement';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf4ff] via-[#fff0f6] to-[#fff5ee]">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
          <span className="ig-gradient-text text-lg font-extrabold tracking-tight">
            EngageVision
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6">
        <PageHeader />
        <WarningCard />
        <EngagementWorkspace />
      </main>

      <footer className="pb-10 text-center text-xs text-muted-foreground">
        Images are processed by the AI engine and are not stored permanently.
        Built for the Soft Computing project.
      </footer>
    </div>
  );
}
