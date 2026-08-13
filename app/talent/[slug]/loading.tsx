import { Back } from "@/app/_components/ui/Icons";

export default function Loading() {
  return (
    <div className="w-screen min-h-screen md:px-14 xl:px-0 md:pb-10 md:pt-0 lg:pt-0 bg-[#f1f1f1] overflow-hidden flex justify-center">
      <div className="w-screen md:w-3xl lg:w-240 xl:w-293">
        {/* Back link */}
        <div className="py-4 flex gap-2 items-center left-0 md:left-56">
          <Back />
          <p className="text-sm md:text-base">Browse Talent</p>
        </div>

        <div className="relative bg-[#ffffff] w-full h-fit rounded-[3px] animate-pulse">
          {/* Employment status hr */}
          <div className="rounded-[3px] bg-gray-200 h-1 sm:h-2 z-30 w-screen md:w-3xl lg:w-240 xl:w-293" />

      <div className="px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 w-screen md:w-3xl lg:w-240 xl:w-293 relative">
        {/* Top row: employment tag + shortlist tag */}
        <div className="flex justify-between w-[calc(100vw-32px)] sm:w-[calc(100vw-80px)] md:w-160 lg:w-3xl xl:w-229 z-40 sticky -mt-1 md:-mt-2">
          <div className="rounded-b-[3px] bg-gray-200 h-9 sm:h-12 w-28 sm:w-36" />
          <div className="rounded-b-[3px] bg-gray-200 h-9 sm:h-12 w-10 sm:w-12" />
        </div>

        <div className="flex flex-col pb-8 pt-16 sm:pb-14 sm:pt-28 gap-6">
          {/* Name + icons */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="h-8 sm:h-10 w-32 sm:w-48 bg-gray-200 rounded" />
                <div className="h-8 sm:h-10 w-6 sm:w-8 bg-gray-200 rounded" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
              </div>
            </div>

            {/* Role + location */}
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <div className="h-5 sm:h-6 w-40 sm:w-56 bg-gray-200 rounded" />
              <div className="flex gap-1 items-center">
                <div className="h-4 w-4 bg-gray-200 rounded-full" />
                <div className="h-5 sm:h-6 w-24 sm:w-32 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {/* Video / Bio */}
            <div className="flex flex-col gap-6">
              <div className="rounded-[3px] overflow-hidden aspect-video bg-gray-200 w-full" />
              <div className="flex flex-col gap-2">
                <div className="h-3 sm:h-4 w-full bg-gray-200 rounded" />
                <div className="h-3 sm:h-4 w-full bg-gray-200 rounded" />
                <div className="h-3 sm:h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Core skills */}
            <div className="flex flex-col gap-4">
              <div className="h-1 bg-gray-200 rounded-[3px] w-[30%] sm:w-[18%]" />

              <div className="flex flex-col gap-2">
                <div className="h-6 sm:h-7 w-36 sm:w-44 bg-gray-200 rounded" />

                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-7 sm:h-8 bg-gray-200 rounded-[3px]"
                      style={{ width: `${60 + (i % 3) * 20}px` }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="h-3 sm:h-4 w-full bg-gray-200 rounded" />
                <div className="h-3 sm:h-4 w-1/2 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Experience highlights */}
            <div className="flex flex-col gap-4">
              <div className="h-1 bg-gray-200 rounded-[3px] w-[30%] sm:w-[18%]" />

              <div className="flex flex-col gap-4">
                <div className="h-6 sm:h-7 w-52 sm:w-64 bg-gray-200 rounded" />

                {/* Work experience card */}
                <div className="rounded flex flex-col gap-2 w-full py-2 sm:py-4 px-5 sm:px-8 bg-[#f8f8f8]">
                  <div className="flex gap-2 items-center">
                    <div className="h-4 sm:h-5 w-24 sm:w-32 bg-gray-200 rounded" />
                    <div className="h-[70%] w-[2.5px] bg-gray-300" />
                    <div className="h-4 sm:h-5 w-24 sm:w-32 bg-gray-200 rounded" />
                  </div>
                  <div className="h-3 sm:h-4 w-full bg-gray-200 rounded" />
                  <div className="h-3 sm:h-4 w-2/3 bg-gray-200 rounded" />
                </div>

                {/* Project cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded flex flex-col gap-2 w-full py-2 sm:py-4 px-5 sm:px-8 bg-[#f8f8f8]"
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                          <div className="h-4 sm:h-5 w-20 sm:w-28 bg-gray-200 rounded" />
                          <div className="h-[70%] w-[2.5px] bg-gray-300" />
                          <div className="h-4 sm:h-5 w-16 sm:w-20 bg-gray-200 rounded" />
                        </div>
                        <div className="h-4 w-4 bg-gray-200 rounded-full" />
                      </div>
                      <div className="h-3 sm:h-4 w-full bg-gray-200 rounded" />
                      <div className="h-3 sm:h-4 w-1/2 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Endorsement */}
            <div className="flex flex-col gap-4">
              <div className="h-1 bg-gray-200 rounded-[3px] w-[30%] sm:w-[18%]" />
              <div className="flex flex-col gap-4">
                <div className="h-6 sm:h-7 w-40 sm:w-48 bg-gray-200 rounded" />
                <div className="rounded w-full p-4 bg-[#f8f8f8]">
                  <div className="flex gap-2">
                    <div className="h-5 w-5 bg-gray-200 rounded-full shrink-0" />
                    <div className="flex flex-col gap-2 w-full">
                      <div className="h-3 sm:h-4 w-full bg-gray-200 rounded" />
                      <div className="h-3 sm:h-4 w-5/6 bg-gray-200 rounded" />
                      <div className="h-3 sm:h-4 w-1/3 bg-gray-200 rounded mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  );
}