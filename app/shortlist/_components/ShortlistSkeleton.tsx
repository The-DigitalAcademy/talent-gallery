"use client";

export default function ShortlistSkeleton() {
  return (
    <div className="flex flex-col gap-3.5 mb-8">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="border border-gray-100 rounded-md p-4 sm:p-6 animate-pulse flex items-center gap-4 min-h-[105px] sm:min-h-[115px]"
        >
          <div className="size-12 sm:size-14 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1 space-y-2.5">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-3 bg-gray-150 rounded w-1/2" />
            <div className="h-2.5 bg-gray-100 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
