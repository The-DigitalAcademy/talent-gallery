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
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
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

        {/* Steps */}
        <div className="grid grid-cols-3 gap-0 items-start relative">

          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-start px-6">

              {/* Dotted arrow connector */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+40px)] right-[-calc(50%-40px)] w-[calc(100%-80px)] flex items-center pointer-events-none z-0">
                  <svg
                    viewBox="0 0 120 24"
                    className="w-full h-6 text-gray-300"
                    fill="none"
                  >
                    <path
                      d="M4 12 Q60 2 114 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="5 4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M108 8 L114 12 L108 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {/* Red Icon Box */}
              <div className="relative z-10 bg-red-500 rounded-md w-16 h-16 flex items-center justify-center mb-6 shadow-md">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-[13px] font-extrabold text-gray-900 uppercase tracking-widest leading-snug mb-3">
                {step.title.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-gray-500 leading-relaxed">
                {step.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
