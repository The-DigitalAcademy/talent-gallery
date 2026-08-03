import { FilterParams } from './actions';
import { Metadata } from 'next';
import TalentSection from '../_components/talents/TalentSection';

//  DYNAMIC SEO GENERATOR
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const filters = await searchParams;
  const currentPage = filters.page || "1";

  // Customize details dynamically based on active filters
  const locationSubtext = filters.location ? ` in ${filters.location}` : "";
  const capabilitySubtext = filters.capability ? ` skilled in ${filters.capability}` : "";

  return {
    title: `Browse Talent${locationSubtext}${capabilitySubtext} (Page ${currentPage})`,
    description: `Explore verified specialized professionals${locationSubtext}${capabilitySubtext}. Page ${currentPage} of results.`,
    alternates: {
      // Helps search engines avoid duplicate content indexing penalties from pagination parameters
      canonical: `/talents${filters.page ? `?page=${filters.page}` : ""}`,
    },
  };
}

interface ExtendedFilterParams extends FilterParams {
  page?: string;
}

interface PageProps {
  searchParams: Promise<ExtendedFilterParams>;
}

export default async function Home({ searchParams }: PageProps) {
  return (
    <TalentSection searchParams={searchParams}/>
  );
}