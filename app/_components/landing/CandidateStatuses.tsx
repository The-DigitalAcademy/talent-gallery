export default function CandidateStatuses() {
  const statuses = [
    {
      label: "Available for WPE",
      description:
        "Actively seeking employment opportunities and available for introductions.",
      badge: "bg-orange-500 text-white",
    },
    {
      label: "Available for Hire",
      description:
        "Seeking workplace experience opportunities to gain industry exposure.",
      badge: "bg-amber-400 text-white",
    },
    {
      label: "In WPE",
      description:
        "Currently completing a workplace experience placement while continuing to develop practical skills.",
      badge: "bg-purple-500 text-white",
    },
    {
      label: "Employed",
      description: "Successfully employed.",
      badge: "bg-teal-400 text-white",
    },
    {
      label: "Reserved",
      description:
        "Currently engaged in an active recruitment or placement process.",
      badge: "bg-white text-gray-700 border border-gray-300",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-widest">
            Candidate Statuses
          </h2>
          <p className="mt-3 text-[15px] text-gray-500 max-w-md mx-auto leading-relaxed">
            Candidate statuses provide a quick view of current availability and
            engagement.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-2">

            {/* LEFT: Status List */}
            <div className="p-10 border-r border-slate-100">
              <div className="flex flex-col gap-5">
                {statuses.map((status) => (
                  <div key={status.label} className="flex items-start gap-5">
                    {/* Badge */}
                    <span
                      className={`text-[11px] font-bold px-3 py-1.5 rounded whitespace-nowrap flex-shrink-0 min-w-[140px] text-center ${status.badge}`}
                    >
                      {status.label}
                    </span>
                    {/* Description */}
                    <p className="text-[13px] text-gray-500 leading-relaxed pt-0.5">
                      {status.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Dark Navy Info Card */}
            <div className="bg-[#01317F] p-10 flex flex-col justify-between relative">

              {/* Clipboard icon top-right */}
              <div className="absolute top-4 right-4">
                <div className="relative">
                  <div className="bg-[#01317F] border-2 border-white/20 rounded-lg p-2.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-6 h-6">
                      <rect x="8" y="2" width="8" height="4" rx="1" />
                      <rect x="4" y="4" width="16" height="18" rx="2" />
                      <path d="M8 11h8M8 15h5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    2
                  </span>
                </div>
              </div>

              {/* Heading */}
              <div>
                <h3 className="text-white font-extrabold text-[15px] uppercase tracking-wide leading-snug max-w-[220px]">
                  Designed to support long-term talent connections.
                </h3>
              </div>

              {/* Body text */}
              <div className="flex flex-col gap-5 mt-8">
                <p className="text-white/80 text-[13px] leading-relaxed">
                  You may express interest in any candidate, regardless of their
                  current status.
                </p>
                <p className="text-white/80 text-[13px] leading-relaxed">
                  Where immediate engagement is not possible, we keep your
                  interest on file and facilitate future opportunities as
                  candidates become available or progress in their careers.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
