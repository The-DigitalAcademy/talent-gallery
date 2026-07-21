export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: ["BROWSE", "CANDIDATES"],
      description:
        "Explore verified candidate profiles, skills, qualifications, certifications, and project experience.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-8 h-8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 16.5L19 19" />
          <path d="M13.5 9H7M10 13H7" />
          <path d="M20 10.5V6.8c0-.8 0-1.2-.1-1.5a2 2 0 0 0-1.2-1.2C18.4 4 18 4 17.2 4H6.8c-.8 0-1.2 0-1.5.1a2 2 0 0 0-1.2 1.2C4 5.6 4 6 4 6.8v10.4c0 .8 0 1.2.1 1.5a2 2 0 0 0 1.2 1.2c.3.1.7.1 1.5.1h4.7" />
          <circle cx="14" cy="14" r="3" />
        </svg>
      ),
    },
    {
      id: 2,
      title: ["SHORTLIST", "TALENT"],
      description:
        "Save promising profiles, compare talent, and identify the best fit for your opportunity.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-8 h-8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15.5 15.5H19.5M17.5 13.5V17.5" />
          <path d="M12.5 7.5H6M10 11.5H6M8.5 15.5H6" />
          <path d="M12.5 19.5H6.5c-.9 0-1.4 0-1.7-.3-.3-.3-.3-.8-.3-1.7v-11c0-.9 0-1.4.3-1.7.3-.3.8-.3 1.7-.3h11c.9 0 1.4 0 1.7.3.3.3.3.8.3 1.7V11" />
        </svg>
      ),
    },
    {
      id: 3,
      title: ["CONNECT &", "HIRE"],
      description:
        "Share your shortlist with Shaper and we'll facilitate candidate engagement and next steps.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-8 h-8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 17V7c0-.8 0-1.2.1-1.5a2 2 0 0 1 1.2-1.2C3.6 4 4.1 4 5 4h14c.9 0 1.4 0 1.7.1a2 2 0 0 1 1.2 1.2c.1.3.1.7.1 1.5V17c0 .9 0 1.4-.3 1.7-.3.3-.8.3-1.7.3H4c-.9 0-1.4 0-1.7-.3C2 18.4 2 17.9 2 17z" />
          <path d="M4 7l8 5 8-5" />
          <circle cx="19" cy="5" r="2.5" fill="white" stroke="white" strokeWidth={0} />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="bg-white pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-[34px] font-bold text-gray-900 leading-tight">
            Shaper
          </h2>
          <p className="text-[34px] font-bold text-red-500 uppercase tracking-widest leading-tight">
            TALENT
          </p>
          <p className="mt-4 text-[19px] text-gray-500 max-w-lg mx-auto leading-relaxed">
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
                <div className="relative z-10 bg-red-500 rounded-md w-16 h-16 flex-shrink-0 flex items-center justify-center">
                  {step.icon}
                </div>

                {/* Dotted arrow — alternating upward and downward arcs */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+36px)] right-[-50%+36px] w-[calc(100%-72px)] flex items-center pointer-events-none">
                    {index === 0 ? (
                      /* Arrow 1: Upward Arc from top-right of Step 1 to top-left of Step 2 */
                      <svg
                        viewBox="0 0 160 32"
                        className="w-full h-10 text-gray-300 -mt-6"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M 4 24 Q 80 0 154 20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="5 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 146 14 L 154 20 L 148 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      /* Arrow 2: Downward Arc from bottom-right of Step 2 to bottom-left of Step 3 */
                      <svg
                        viewBox="0 0 160 32"
                        className="w-full h-10 text-gray-300 mt-6"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M 4 8 Q 80 32 154 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="5 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 148 7 L 154 12 L 146 17"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-wider leading-snug mb-3">
                {step.title.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h3>

              {/* Description */}
              <p className="text-[18px] text-gray-500 leading-relaxed max-w-[260px]">
                {step.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
