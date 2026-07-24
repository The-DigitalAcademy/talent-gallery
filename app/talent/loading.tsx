import TalentGridSkeleton from "./_components/TalentGridSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-100 pb-12 animate-pulse">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6 space-y-6 pt-10">
        {/* Filter Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 bg-white p-5 rounded-[3px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-1 border-r border-neutral-400 px-5 py-3.5 last:border-r-0">
              <div className="h-5 w-20 bg-slate-200 mb-1"></div>
              <div className="h-4 w-30 bg-slate-200"></div>
            </div>
          ))}
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