"use client";

export default function ShortlistSkeleton() {
  return (
    <div className="flex flex-col gap-3 mb-8">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="border border-gray-100 rounded-md p-4 animate-pulse flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-2.5 bg-gray-100 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
