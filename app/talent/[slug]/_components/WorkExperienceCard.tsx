interface WorkExperienceCardProps {
  role: string;
  company: string;
  duration: string;
}

export function WorkExperienceCard({ role, company, duration }: WorkExperienceCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white flex items-start gap-3">
      {/* Briefcase icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-orange-500 shrink-0 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 016 4.5h12a2.25 2.25 0 012.25 2.25v3.4M15.75 4.5v-1.5A1.5 1.5 0 0014.25 1.5h-4.5A1.5 1.5 0 008.25 3v1.5"
        />
      </svg>
      <div>
        <p className="font-bold text-gray-900 text-sm">{role}</p>
        <p className="text-gray-600 text-sm">{company}</p>
        <p className="text-gray-500 text-sm">{duration}</p>
      </div>
    </div>
  );
}