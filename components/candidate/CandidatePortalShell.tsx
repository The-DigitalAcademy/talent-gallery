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
import {
  CANDIDATE_PROFILE_SECTIONS,
  MOCK_CANDIDATE_USER,
  SectionStatus,
} from "./navigation-data";

export interface PortalLiveMetrics {
  readinessPercent: number;
  stepsRemaining: number;
  alertCount: number;
  reviewStatus: "UNDER REVIEW" | "PENDING REVIEW" | "DRAFT";
  candidateRole: string;
  avatarPreviewUrl: string | null;
  sectionStatuses: Record<string, SectionStatus>;
}

const DEFAULT_SECTION_STATUSES: Record<string, SectionStatus> =
  Object.fromEntries(
    CANDIDATE_PROFILE_SECTIONS.map((s) => [s.id, s.status])
  ) as Record<string, SectionStatus>;

const DEFAULT_METRICS: PortalLiveMetrics = {
  readinessPercent: MOCK_CANDIDATE_USER.sidebarReadiness,
  stepsRemaining: 2,
  alertCount: MOCK_CANDIDATE_USER.dashboardAlertCount,
  reviewStatus: "UNDER REVIEW",
  candidateRole: MOCK_CANDIDATE_USER.role,
  avatarPreviewUrl: null,
  sectionStatuses: DEFAULT_SECTION_STATUSES,
};

interface CandidatePortalContextValue {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  metrics: PortalLiveMetrics;
  setMetrics: React.Dispatch<React.SetStateAction<PortalLiveMetrics>>;
}

const CandidatePortalContext = createContext<CandidatePortalContextValue>({
  activeSection: CANDIDATE_PROFILE_SECTIONS[0].id,
  scrollToSection: () => {},
  metrics: DEFAULT_METRICS,
  setMetrics: () => {},
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
  const [metrics, setMetrics] = useState<PortalLiveMetrics>(DEFAULT_METRICS);
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
      value={{ activeSection, scrollToSection, metrics, setMetrics }}
    >
      <div className="h-screen w-full flex overflow-hidden bg-[#F8FAFC] text-slate-900">
        <CandidateSidebar
          activeSection={activeSection}
          onSelectSection={scrollToSection}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          readinessPercent={metrics.readinessPercent}
          stepsRemaining={metrics.stepsRemaining}
          alertCount={metrics.alertCount}
          sectionStatuses={metrics.sectionStatuses}
        />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <CandidateHeader
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
            reviewStatus={metrics.reviewStatus}
            candidateRole={metrics.candidateRole}
            avatarPreviewUrl={metrics.avatarPreviewUrl}
          />

          <main
            id="candidate-portal-main"
            ref={mainScrollRef}
            className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 scroll-smooth"
          >
            {children}
          </main>
        </div>
      </div>
    </CandidatePortalContext.Provider>
  );
}
