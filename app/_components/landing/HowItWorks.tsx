export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: ["BROWSE", "CANDIDATES"],
      description:
        "Explore verified candidate profiles, skills, qualifications, certifications, and project experience.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-8 h-8">
          <rect x="3" y="3" width="14" height="17" rx="2" strokeLinecap="round" />
          <circle cx="14" cy="14" r="4" />
          <path d="M17 17l3 3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 2,
      title: ["SHORTLIST", "TALENT"],
      description:
        "Save promising profiles, compare talent, and identify the best fit for your opportunity.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-8 h-8">
          <rect x="4" y="2" width="14" height="18" rx="2" strokeLinecap="round" />
          <path d="M8 7h6M8 11h4" strokeLinecap="round" />
          <circle cx="16" cy="17" r="3" fill="white" stroke="white" />
          <path d="M16 15.5v3M14.5 17h3" stroke="#ef4444" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 3,
      title: ["CONNECT &", "HIRE"],
      description:
        "Share your shortlist with Shaper and we'll facilitate candidate engagement and next steps.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-8 h-8">
          <rect x="2" y="6" width="20" height="14" rx="2" strokeLinecap="round" />
          <path d="M2 9l10 6 10-6" strokeLinecap="round" />
          <circle cx="18" cy="6" r="3" fill="white" />
          <circle cx="18" cy="6" r="1.5" fill="#ef4444" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Shaper
          </h2>
          <p className="text-4xl font-extrabold text-red-500 uppercase tracking-widest leading-tight">
            TALENT
          </p>
          <p className="mt-5 text-[17px] text-gray-500 max-w-lg mx-auto leading-relaxed">
            Discover emerging talent equipped with practical skills and
            real-world experience.
          </p>
        </div>

        {/* Steps — icons row with arrows, then text below */}
        <div className="grid grid-cols-3 gap-8 items-start">

          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center">

              {/* Icon + Arrow row */}
              <div className="flex items-center w-full justify-center mb-8 relative">

                {/* Red Icon Box */}
                <div className="relative z-10 bg-red-500 rounded-md w-16 h-16 flex-shrink-0 flex items-center justify-center shadow-md">
                  {step.icon}
                </div>

                {/* Dotted arrow — only after step 1 and 2 */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+38px)] right-[-50%] flex items-center">
                    <svg
                      viewBox="0 0 160 24"
                      className="w-full h-5 text-gray-300"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M4 12 Q80 2 154 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="6 4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M146 7 L154 12 L146 17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-[13px] font-extrabold text-gray-900 uppercase tracking-widest leading-snug mb-4">
                {step.title.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-gray-500 leading-relaxed max-w-[220px]">
                {step.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
