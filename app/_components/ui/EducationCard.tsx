type EducationCardProps = {
  qualification: string;
  fieldOfStudy?: string | null;
  institution: string;
  duration: string;

  bgColor?: string;
  qualificationStyle?: string;
  fieldOfStudyStyle?: string;
  institutionStyle?: string;
  durationStyle?: string;
  durationLengthStyle?: string;
  padding?: string;
};

export function EducationCard({
  qualification,
  fieldOfStudy,
  institution,
  duration,

  bgColor = "bg-[#f8f8f8]",
  qualificationStyle = "font-bold text-sm sm:text-base",
  fieldOfStudyStyle = "mt-1 text-sm sm:text-base text-gray-700",
  institutionStyle = "mt-3 text-xs sm:text-sm text-gray-500",
  durationStyle = "text-sm sm:text-base text-gray-800",
  durationLengthStyle = "mt-1 text-xs sm:text-sm text-gray-500",
  padding = "py-4 sm:py-6 px-5 sm:px-8",
}: EducationCardProps) {
  const durationMatch = duration.match(
    /^(.*?)\s*\((.*?)\)$/,
  );

  const dateRange = durationMatch
    ? durationMatch[1]
    : duration;

  const durationLength = durationMatch
    ? durationMatch[2]
    : null;

  return (
    <article
      className={`grid grid-cols-[1fr_auto] gap-6 ${bgColor} ${padding}`}
    >
      {/* Left */}
      <div className="min-w-0">
        <h3 className={qualificationStyle}>
          {qualification}
        </h3>

        {fieldOfStudy && (
          <div className={fieldOfStudyStyle}>
            {fieldOfStudy}
          </div>
        )}

        <div className={institutionStyle}>
          {institution}
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end text-right">
        <div className={durationStyle}>
          {dateRange}
        </div>

        {durationLength && (
          <div className={durationLengthStyle}>
            {durationLength}
          </div>
        )}
      </div>
    </article>
  );
}