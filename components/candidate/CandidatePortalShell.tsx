"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import CandidateSidebar from "./CandidateSidebar";
import CandidateHeader from "./CandidateHeader";
import { CANDIDATE_PROFILE_SECTIONS } from "./navigation-data";

interface CandidatePortalContextValue {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const CandidatePortalContext = createContext<CandidatePortalContextValue>({
  activeSection: CANDIDATE_PROFILE_SECTIONS[0].id,
  scrollToSection: () => {},
});

export function useCandidatePortal() {
  return useContext(CandidatePortalContext);
}

export default function CandidatePortalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState<string>(
    CANDIDATE_PROFILE_SECTIONS[0].id
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainScrollRef = useRef<HTMLElement | null>(null);
  const isProgrammaticScroll = useRef(false);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      isProgrammaticScroll.current = true;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 650);
    }
  }, []);

  useEffect(() => {
    const container = mainScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;
      const containerTop = container.getBoundingClientRect().top;
      let closestId = CANDIDATE_PROFILE_SECTIONS[0].id;
      let smallestDistance = Number.POSITIVE_INFINITY;

      for (const section of CANDIDATE_PROFILE_SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerTop - 32);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestId = section.id;
        }
      }

      setActiveSection(closestId);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CandidatePortalContext.Provider
      value={{ activeSection, scrollToSection }}
    >
      <div className="h-screen w-full flex overflow-hidden bg-[#F8FAFC] text-slate-900">
        <CandidateSidebar
          activeSection={activeSection}
          onSelectSection={scrollToSection}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <CandidateHeader
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />

          <main
            id="candidate-portal-main"
            ref={mainScrollRef}
            className="flex-1 overflow-y-auto px-6 md:px-8 py-6 scroll-smooth"
          >
            {children}
          </main>
        </div>
      </div>
    </CandidatePortalContext.Provider>
  );
}

