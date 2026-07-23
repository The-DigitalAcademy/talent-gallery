export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 animate-pulse">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto -mt-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-16 rounded bg-slate-200" />

            <div className="space-y-3 pt-2">
              <div className="h-8 w-36 rounded bg-slate-200" />
            </div>
          </div>

          <div className="mt-2 h-4 w-72 rounded bg-slate-200" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Filter Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-5">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-slate-200" />
            <div className="h-5 w-28 rounded bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-20 rounded bg-slate-200" />
                <div className="h-11 rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="h-4 w-56 rounded bg-slate-200" />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <TalentCardSkeleton key={i} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 pt-8">
          <div className="h-10 w-36 rounded-xl bg-slate-200" />
          <div className="h-10 w-32 rounded-xl bg-slate-200" />
          <div className="h-10 w-36 rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function TalentCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden relative">
      {/* top accent */}
      <div className="h-1 bg-slate-200" />

      {/* utility icons */}
      <div className="absolute top-4 right-4 flex gap-3">
        <div className="h-4 w-4 rounded bg-slate-200" />
        <div className="h-4 w-4 rounded bg-slate-200" />
      </div>

      <div className="p-6">
        {/* Profile */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-slate-200" />

          <div className="space-y-2 flex-1">
            <div className="h-5 w-40 rounded bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-200" />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-3 rounded-full bg-slate-200" />
          <div className="h-3 w-36 rounded bg-slate-200" />
        </div>

        {/* Pills */}
        <div className="flex gap-2 mb-4">
          <div className="h-7 w-36 rounded bg-slate-200" />
          <div className="h-7 w-24 rounded bg-slate-200" />
        </div>

        {/* Bio */}
        <div className="space-y-2 mb-5">
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-5/6 rounded bg-slate-200" />
          <div className="h-4 w-2/3 rounded bg-slate-200" />
        </div>

        {/* Capabilities */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-6 rounded-md bg-slate-200"
              style={{
                width: `${60 + (i % 4) * 18}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 bg-slate-50/30 py-3 flex justify-center">
        <div className="h-4 w-32 rounded bg-slate-200" />
      </div>
    </div>
  );
}