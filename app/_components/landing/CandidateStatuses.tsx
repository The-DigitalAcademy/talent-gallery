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
    <section className="bg-white pt-0 pb-20 overflow-x-hidden">
      {/* Outer container — expanded to max-w-7xl to match page layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-6 relative">

        {/* Grey Box — spacious container with right margin for overlapping Navy Card */}
        <div className="bg-[#EFEFEF] rounded-[3px] pt-12 pb-0 lg:pb-14 min-h-[520px] w-full overflow-hidden flex flex-col justify-between">
          
          <div>
            {/* Heading — centered inside the grey box */}
            <div className="text-center mb-10 px-6 max-w-2xl mx-auto">
              <h2 className="text-[26px] font-bold text-black uppercase tracking-wider">
                Candidate Statuses
              </h2>
              <p className="mt-3 text-[17px] text-gray-600 leading-relaxed">
                Candidate statuses provide a quick view of current availability and
                engagement.
              </p>
            </div>

            {/* Content Area — ample horizontal space for status list */}
            <div className="pl-6 md:pl-16 pr-6 lg:pr-[380px]">
              {/* Status List */}
              <div className="flex flex-col gap-6 md:gap-5">
                {statuses.map((status) => (
                  <div key={status.label} className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-2 md:gap-4">
                    <span
                      className={`text-[14px] font-semibold px-4 py-2.5 rounded-[3px] whitespace-nowrap flex-shrink-0 min-w-[160px] text-center ${status.badge}`}
                    >
                      {status.label}
                    </span>
                    <p className="text-[15px] md:text-[16px] text-gray-700 leading-relaxed pt-0.5 flex-1">
                      {status.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE Navy Card — sits flush at the bottom of main card on < lg screens */}
          <div className="block lg:hidden mt-8 bg-[#01317F] rounded-b-[3px] p-6 sm:p-8 text-white">
            <h3 className="font-bold text-[16px] sm:text-[18px] uppercase tracking-wide leading-snug mb-3">
              Designed to support long-term talent connections.
            </h3>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              You may express interest in any candidate, regardless of their current status. Where immediate engagement is not possible, we keep your interest on file.
            </p>
          </div>

        </div>

        {/* Navy Card — positioned down and to the right, overlapping the right side */}
        <div className="hidden lg:flex absolute right-[-30px] top-[150px] w-[350px] bg-[#01317F] rounded-[3px] overflow-hidden flex-col justify-between min-h-[440px] z-10">
          
          {/* Navy top — heading */}
          <div className="px-6 pt-10 pb-8">
            <h3 className="text-white font-bold text-[16px] uppercase tracking-wider leading-snug">
              Designed to support long-term talent connections.
            </h3>
          </div>

          {/* Light section — body text, inside the same card */}
          <div className="bg-[#D8D8D8] px-8 pt-8 pb-10 flex-1 flex flex-col justify-center border-t border-gray-300/60">
            <p className="text-gray-600 text-[16px] leading-relaxed mb-6">
              You may express interest in any candidate, regardless of their
              current status.
            </p>
            <p className="text-gray-600 text-[16px] leading-relaxed">
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
