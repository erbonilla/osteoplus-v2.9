export default function ProfileLoading() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg-primary">
      {/* Topbar skeleton */}
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border-default bg-surface-card px-4 md:px-6">
        <div className="h-8 w-32 animate-pulse rounded-input bg-bg-tertiary" />
        <div className="flex items-center gap-2">
          <div className="h-10 w-24 animate-pulse rounded-input bg-bg-tertiary" />
          <div className="h-10 w-16 animate-pulse rounded-chip bg-bg-tertiary" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-bg-tertiary" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar skeleton — desktop only */}
        <div className="hidden w-64 flex-col gap-1 border-r border-border-default bg-surface-card px-2 py-4 lg:flex">
          {Array.from({ length: 5 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items
            <div key={i} className="h-10 animate-pulse rounded-input bg-bg-tertiary" />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl px-4 py-6 md:px-6 md:py-8">
            <div className="mb-6 flex flex-col gap-2">
              <div className="h-8 w-48 animate-pulse rounded-input bg-bg-tertiary" />
              <div className="h-4 w-72 animate-pulse rounded-input bg-bg-tertiary" />
            </div>
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items
                <div key={i} className="h-24 animate-pulse rounded-card bg-bg-tertiary" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
