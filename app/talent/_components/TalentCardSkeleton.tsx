export default function TalentCardSkeleton() {
  return (
    <div className="bg-white rounded-[3px] overflow-hidden animate-pulse border-t-4 border-slate-200 flex flex-col gap-6 px-6 pb-6">

      <div className="flex justify-between">
        <div className="w-2/4 h-9 bg-slate-200 rounded-b"></div>
        <div className="w-8 h-9 bg-slate-200 rounded-b"></div>
      </div>

      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative size-20 rounded-full overflow-hidden bg-slate-200"></div>
        <div className="flex-1 space-y-2">
          <div className="h-5 w-40 rounded bg-slate-200" />
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-3 w-35 rounded bg-slate-200" />
        </div>
      </div>


      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-5 bg-slate-200"
            style={{ width: `${60 + i * 12}px` }}
          />
        ))}
      </div>

      <div className="space-y-2">
        <div className="h-4 rounded bg-slate-200" />
        <div className="h-4 rounded bg-slate-200" />
        <div className="h-4 w-5/6 rounded bg-slate-200" />
      </div>
    </div>
  );
}