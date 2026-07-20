import TalentGridSkeleton from "./_components/TalentGridSkeleton";

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
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
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
        <TalentGridSkeleton />

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