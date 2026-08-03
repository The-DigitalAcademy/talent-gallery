import { Metadata } from "next";
import TalentSection from "../_components/talents/TalentSection";
import { FilterParams } from "../talent/actions";

//  DYNAMIC SEO GENERATOR
export async function generateMetadata({ searchParams, params }: PageProps): Promise<Metadata> {
  const filters = await searchParams;
  const { cohort } = await params;
  const currentPage = filters.page || "1";

  // Make the cohort slug readable (e.g. "spring-2024" -> "Spring 2024")
  const cohortLabel = cohort
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Customize details dynamically based on active filters
  const locationSubtext = filters.location ? ` in ${filters.location}` : "";
  const capabilitySubtext = filters.capability ? ` skilled in ${filters.capability}` : "";

  return {
    title: `Browse ${cohortLabel} Talent${locationSubtext}${capabilitySubtext} (Page ${currentPage})`,
    description: `Explore verified specialized professionals from the ${cohortLabel} cohort${locationSubtext}${capabilitySubtext}. Page ${currentPage} of results.`,
    alternates: {
      // Helps search engines avoid duplicate content indexing penalties from pagination parameters
      canonical: `/${cohort}${filters.page ? `?page=${filters.page}` : ""}`,
    },
  };
}

interface ExtendedFilterParams extends FilterParams {
  page?: string;
}

interface PageProps {
  searchParams: Promise<ExtendedFilterParams>;
  params: Promise<{ cohort: string }>;
}

export default async function Page({ searchParams, params }: PageProps) {
  const { cohort } = await params;

  return  (
    <TalentSection searchParams={searchParams} cohort={cohort} basePath={`/${cohort}`} />
  );
}