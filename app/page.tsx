import Navbar from "./_components/landing/Navbar";
import HeroSection from "./_components/landing/HeroSection";
import HowItWorks from "./_components/landing/HowItWorks";
import CandidateStatuses from "./_components/landing/CandidateStatuses";
import BrowseTalentPreview from "./_components/landing/BrowseTalentPreview";
import TrustedBy from "./_components/landing/TrustedBy";
import FooterCTA from "./_components/landing/FooterCTA";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <CandidateStatuses />
      <BrowseTalentPreview />
      <TrustedBy />
      <FooterCTA />
    </main>
  );
}