export function PageHeader() {
  return (
    <div className="space-y-3 text-center">
      <p className="ig-gradient-text text-[11px] font-bold uppercase tracking-[2.5px]">
        AI Image Analysis
      </p>
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
        Check <span className="ig-gradient-text">Engagement</span>
        <br />
        For Your Photo
      </h1>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        Upload a photo and get the result in seconds. We analyze its engagement
        potential and estimate how strong its visual appeal is.
      </p>
    </div>
  );
}
