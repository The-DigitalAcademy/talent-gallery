export default function TalentCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">

      <div className="h-1 bg-slate-200" />

      <div className="p-6">

        <div className="flex items-center gap-4 mb-5">

          {/* Avatar */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-200">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-[shimmer_1.4s_infinite]" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="h-5 w-40 rounded bg-slate-200" />
            <div className="h-4 w-28 rounded bg-slate-200" />
          </div>

        </div>

        <div className="h-4 w-32 rounded bg-slate-200 mb-4" />

        <div className="flex gap-2 mb-5">
          <div className="h-7 w-24 rounded-full bg-slate-200" />
          <div className="h-7 w-28 rounded-full bg-slate-200" />
        </div>

        <div className="space-y-2 mb-5">
          <div className="h-4 rounded bg-slate-200" />
          <div className="h-4 rounded bg-slate-200" />
          <div className="h-4 w-5/6 rounded bg-slate-200" />
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-6 rounded-md bg-slate-200"
              style={{ width: `${60 + i * 12}px` }}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 py-3 flex justify-center">
        <div className="h-4 w-32 rounded bg-slate-200" />
      </div>
    </div>
  );
}