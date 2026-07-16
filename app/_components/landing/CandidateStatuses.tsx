export default function CandidateStatuses() {
  const statuses = [
    {
      label: "Available for WPE",
      description:
        "Actively seeking employment opportunities and available for introductions.",
      badge: "bg-amber-400 text-white",
    },
    {
      label: "Available for Hire",
      description:
        "Seeking workplace experience opportunities to gain industry exposure.",
      badge: "bg-orange-500 text-white",
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
      badge: "bg-slate-200 text-gray-700 border border-slate-300",
    },
  ];

  return (
    <section className="bg-white py-20 overflow-x-hidden">
      {/* Outer container — centered container for the grey box */}
      <div className="max-w-4xl mx-auto px-6 relative">

        {/* Grey Box — centered on the page (w-full inside max-w-4xl mx-auto) */}
        <div className="bg-[#EFEFEF] rounded-2xl pt-12 pb-14 min-h-[520px] w-full">
          
          {/* Heading — centered inside the grey box */}
          <div className="text-center mb-10 px-10">
            <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-widest">
              Candidate Statuses
            </h2>
            <p className="mt-3 text-[14px] text-gray-500 max-w-md mx-auto leading-relaxed">
              Candidate statuses provide a quick view of current availability and
              engagement.
            </p>
          </div>

          {/* Content Area — padded to keep list on the left and avoid overlap with navy card */}
          <div className="pl-10 pr-[280px]">
            {/* Status List */}
            <div className="flex flex-col gap-5">
              {statuses.map((status) => (
                <div key={status.label} className="flex items-start gap-4">
                  <span
                    className={`text-[11px] font-bold px-3 py-2 rounded whitespace-nowrap flex-shrink-0 min-w-[140px] text-center ${status.badge}`}
                  >
                    {status.label}
                  </span>
                  <p className="text-[12.5px] text-gray-600 leading-relaxed pt-0.5">
                    {status.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Navy Card — absolutely positioned to overlap the right edge and hang off by 80px */}
        <div className="absolute right-[-80px] top-[140px] w-[350px] bg-[#01317F] rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between min-h-[420px] z-10">
          
          {/* Navy top — heading */}
          <div className="px-8 pt-10 pb-8">
            <h3 className="text-white font-extrabold text-[15px] uppercase tracking-wide leading-snug">
              Designed to support long-term talent connections.
            </h3>
          </div>

          {/* Light section — body text, inside the same card */}
          <div className="bg-[#EFEFEF] px-8 pt-8 pb-10 flex-1 flex flex-col justify-center border-t border-gray-200">
            <p className="text-gray-600 text-[13px] leading-relaxed mb-6">
              You may express interest in any candidate, regardless of their
              current status.
            </p>
            <p className="text-gray-600 text-[13px] leading-relaxed">
              Where immediate engagement is not possible, we keep your
              interest on file and facilitate future opportunities as
              candidates become available or progress in their careers.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
