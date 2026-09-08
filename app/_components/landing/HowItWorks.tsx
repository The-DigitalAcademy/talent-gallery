import Image from "next/image";
import { DownwardCurveArrow, UpwardCurveArrow } from "../ui/Icons";

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
    <section id="how-it-works" className="bg-white pt-3 md:pt-20 pb-8">
      <div className="max-w-7xl mx-auto md:px-6 lg:px-6">

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16 px-6 sm:px-8">
          <div className="relative h-12 w-48 sm:w-56 mb-1">
            <Image
              src={"https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/shaper-brand-name.png"}
              alt={"Shaper logo"}
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="-mt-1 text-[32px] sm:text-[34px] font-medium text-red-500 uppercase tracking-widest leading-tight">
            TALENT
          </p>
          <p className="mt-4 text-[17px] sm:text-[19px] text-black max-w-lg mx-auto px-4 sm:px-6 leading-relaxed">
            Discover emerging talent equipped with practical skills and
            real-world experience.
          </p>
        </div>

        {/* Steps — Vertical stack on mobile with dashed arrow; 3 columns on desktop */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-10 md:gap-8 items-center md:items-start px-6 sm:px-0">

          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center w-full">

              {/* Icon + Arrow container */}
              <div className="flex items-center w-full justify-center mb-6 md:mb-8 relative">

                {/* Red Icon Box */}
                <div className="relative z-10 bg-red-600 rounded-[3px] w-16 h-16 flex-shrink-0 flex items-center justify-center text-white">
                  {step.icon}
                </div>

                {/* DESKTOP Dotted arrow */}
                {index < steps.length - 1 && (
                  <>
                    {index == 0 ? (
                      <div className="hidden md:flex absolute -top-43 left-[calc(50%+50.5px)] w-[calc(100%-72px)] items-center pointer-events-none">
                        <UpwardCurveArrow />
                      </div>
                    ) : (
                      <div className="hidden md:flex absolute -bottom-43 left-[calc(50%+50.5px)] w-[calc(100%-72px)] items-center pointer-events-none">
                        <DownwardCurveArrow />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="text-[20px] text-black uppercase tracking-wider leading-snug mb-3">
                {step.title.map((line, i) => (
                  <span key={i} className="inline md:block">{line} </span>
                ))}
              </h3>

              {/* Description */}
              <p className="text-[14px] md:text-[16px] text-black leading-relaxed max-w-[280px]">
                {step.description}
              </p>

              {/* MOBILE Vertical Dashed Arrow — exact desktop #E5E5E5 */}
              {index < steps.length - 1 && (
                <div className="flex md:hidden flex-col items-center my-6 text-[#E5E5E5]">
                  <div className="w-[2px] h-12 border-r-2 border-dashed border-[#E5E5E5]" />
                  <svg className="w-5 h-5 text-[#E5E5E5] -mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </div>
              )}

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
