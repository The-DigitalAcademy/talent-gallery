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
    <section className="bg-slate-100 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Heading — on grey, no card */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-widest">
            Candidate Statuses
          </h2>
          <p className="mt-3 text-[15px] text-gray-500 max-w-md mx-auto leading-relaxed">
            Candidate statuses provide a quick view of current availability and
            engagement.
          </p>
        </div>

        {/* Two column layout with right column locked at 350px */}
        <div className="grid grid-cols-[1fr_350px] gap-12 items-start">

          {/* LEFT: Status list — directly on grey, no card */}
          <div className="flex flex-col gap-6">
            {statuses.map((status) => (
              <div key={status.label} className="flex items-start gap-5">
                <span
                  className={`text-[11px] font-bold px-4 py-2 rounded whitespace-nowrap flex-shrink-0 min-w-[148px] text-center ${status.badge}`}
                >
                  {status.label}
                </span>
                <p className="text-[13px] text-gray-500 leading-relaxed pt-1">
                  {status.description}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT: Single navy card with ALL content inside */}
          <div className="bg-[#01317F] rounded-2xl shadow-lg overflow-hidden mt-[45px] flex flex-col justify-between min-h-[420px]">

            {/* Navy top — heading */}
            <div className="px-8 pt-12 pb-8">
              <h3 className="text-white font-extrabold text-[15px] uppercase tracking-wide leading-snug">
                Designed to support long-term talent connections.
              </h3>
            </div>

            {/* Light section — body text, inside the same card */}
            <div className="bg-slate-100 px-8 pt-8 pb-12 flex-1 flex flex-col justify-center">
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

      </div>
    </section>
  );
}
