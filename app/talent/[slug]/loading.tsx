export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 animate-pulse">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200" />

            <div className="space-y-2">
              <div className="h-8 w-64 rounded bg-gray-200" />
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="h-4 w-48 rounded bg-gray-200" />
            </div>
          </div>

          <div className="w-6 h-6 rounded-full bg-gray-200" />
        </div>

        <hr className="border-gray-200" />

        <div className="px-6 py-5 space-y-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-36 rounded bg-gray-200" />
            <div className="h-8 w-28 rounded bg-gray-200" />
          </div>

          {/* About */}
          <section className="space-y-3">
            <div className="h-6 w-40 rounded bg-gray-200" />

            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-4/6 rounded bg-gray-200" />
            </div>
          </section>

          {/* Video */}
          <div className="aspect-video rounded-lg bg-gray-200" />

          {/* Core Capabilities */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gray-200" />
              <div className="h-6 w-52 rounded bg-gray-200" />
            </div>

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 rounded bg-gray-200"
                  style={{
                    width: `${70 + (i % 4) * 20}px`,
                  }}
                />
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gray-200" />
              <div className="h-6 w-60 rounded bg-gray-200" />
            </div>

            {Array.from({ length: 2 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </section>

          {/* Work Experience */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gray-200" />
              <div className="h-6 w-48 rounded bg-gray-200" />
            </div>

            {Array.from({ length: 2 }).map((_, i) => (
              <WorkExperienceSkeleton key={i} />
            ))}
          </section>

          {/* Endorsement */}
          <section className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50 p-5 space-y-4">
            <div className="h-6 w-36 rounded bg-gray-200" />

            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-11/12 rounded bg-gray-200" />
              <div className="h-4 w-4/6 rounded bg-gray-200" />
            </div>

            <div className="flex justify-end">
              <div className="h-4 w-40 rounded bg-gray-200" />
            </div>
          </section>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <div className="h-14 flex-1 rounded-lg bg-gray-200" />
            <div className="h-14 flex-1 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 space-y-4">
      <div className="h-5 w-56 rounded bg-gray-200" />

      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-4/5 rounded bg-gray-200" />
      </div>

      <div className="space-y-2">
        <div className="h-3 w-32 rounded bg-gray-200" />

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-8 rounded bg-gray-200"
              style={{
                width: `${60 + (i % 3) * 25}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkExperienceSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex gap-3">
      <div className="w-5 h-5 rounded bg-gray-200 mt-1" />

      <div className="flex-1 space-y-2">
        <div className="h-5 w-48 rounded bg-gray-200" />
        <div className="h-4 w-40 rounded bg-gray-200" />
        <div className="h-4 w-28 rounded bg-gray-200" />
      </div>
    </div>
  );
}