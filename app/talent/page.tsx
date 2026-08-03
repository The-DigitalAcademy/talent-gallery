// app/talents/page.tsx
import FilterControls from '../components/ui/FilterControls';
import { getFilteredTalents, FilterParams } from './actions';
import Link from "next/link";
import { createClient } from '../lib/supabase/server';
import { Suspense } from 'react';
import TalentGridSkeleton from './_components/TalentGridSkeleton';
import TalentGrid from './_components/TalentGrid';
import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ChevronLeftIcon, ChevronRightIcon, ClipboardIcon, ClipboardListIcon } from 'lucide-react';
import { clsx } from 'clsx';

const montserrat = Montserrat({ subsets: ["latin"] })

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

interface ConfirmedTalentSchema {
  id: string;
  fullname: string;
  bio: string | null;
  profile_image_url: string | null;
  slug: string;
  location: { city: string; country: string } | null;
  cohort: { name: string } | null;
  program: { name: string } | null;
  talent_status: { name: string } | null;
  capabilities: Array<{ capability: { id: string; name: string } }>;
}

export default async function Home({ searchParams }: PageProps) {
  const supabase = await createClient();

  const filters = await searchParams;
  const currentPage = Math.max(1, parseInt(filters.page || "1", 10));

  // Must match the itemsPerPage math inside your actions.ts file!
  const itemsPerPage = 12;

  const [
    talentResult, // 💡 Grabs the new returned object wrapper
    { data: cohorts },
    { data: locations },
    { data: programs },
    { data: statuses },
    { data: capabilities },
    { data: roles }
  ] = await Promise.all([
    getFilteredTalents(filters),
    supabase.from("cohorts").select("id, name"),
    supabase.from("locations").select("id, city"),
    supabase.from("programs").select("id, name"),
    supabase.from("talent_statuses").select("id, name"),
    supabase.from("capabilities").select("id, name"),
    supabase.from("roles").select("id, name")
  ]);

  // 💡 Safely pull data and count keys out of your response
  const talents = (talentResult?.data as unknown as ConfirmedTalentSchema[]) || [];
  const totalCount = talentResult?.count || 0;

  // Calculate total pages dynamically based on database state matching filters
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  const buildPaginationUrl = (pageTarget: number) => {
    const nextParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val) nextParams.set(key, val);
    });
    nextParams.set("page", pageTarget.toString());
    return `/talent?${nextParams.toString()}`;
  };



  return (
    <div className={`${montserrat.className} min-h-screen bg-neutral-100 pb-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 space-y-6 pt-10">

        <div className="bg-white p-5 rounded-[3px]">
          <FilterControls
            roles={roles || []}
            locations={locations || []}
            programs={programs || []}
            cohorts={cohorts || []}
            statuses={statuses || []}
            capabilities={capabilities || []}
          />
        </div>

        {/*  ACCURATE DYNAMIC RECONCILIATION COUNT COUNTER */}
        <div className="text-xs px-1">
          Showing {talents.length} of {totalCount} talents
        </div>

        {/* Talent Cards Grid Matrix */}
        <Suspense
          key={JSON.stringify(filters)}
          fallback={<TalentGridSkeleton />}
        >
          <TalentGrid filters={filters} />
        </Suspense>

        {/*  PAGINATION PANEL */}
        {(
          <div className="flex items-center justify-center gap-1 pt-8">
            {currentPage > 1 && (
              <Link
                href={buildPaginationUrl(currentPage - 1)}
                className="bg-white px-1 md:px-4 text-sm md:text-base h-8 md:h-9 flex items-center justify-center rounded-[3px]"
              >
                <ChevronLeftIcon className='size-4 md:size-5' /> <span className='hidden md:block'>Previous</span>
              </Link>
            )}
            <div className='flex gap-1'>
              <Link
                href={buildPaginationUrl(1)}
                className={clsx(
                  'rounded flex items-center justify-center size-8 md:size-9',
                  { "bg-gray-900 text-white": 1 == currentPage },
                  { "bg-white": 1 != currentPage },)}>
                1
              </Link>
              <div className={clsx({ "hidden": currentPage < 4 })}>...</div>
              {Array.from({ length: totalPages - 2 }, (_, i) => i + 2)
                .filter((num, ind, arr) => num == currentPage || (num < currentPage + 3 && num > currentPage - 3))
                .map(pageNum => (
                  <Link
                    key={pageNum}
                    href={buildPaginationUrl(pageNum)}
                    className={clsx(
                      'rounded flex items-center justify-center size-8 md:size-9',
                      { "bg-gray-900 text-white": pageNum == currentPage },
                      { "bg-white": pageNum != currentPage })}>
                    {pageNum}
                  </Link>
                ))}
              <div className={clsx({ "hidden": currentPage > totalPages - 4 })}>...</div>
              <Link
                href={buildPaginationUrl(totalPages)}
                className={clsx(
                  'rounded flex items-center justify-center size-8 md:size-9',
                  { "bg-gray-900 text-white": totalPages == currentPage },
                  { "bg-white": totalPages != currentPage },)}>
                {totalPages}
              </Link>
            </div>

            {/*  THE KILL SWITCH: Disappears if you hit the final mathematically determined chunk */}
            {currentPage < totalPages && (
              <Link
                href={buildPaginationUrl(currentPage + 1)}
                className="bg-white px-1 md:px-4 h-8 md:h-9 flex items-center justify-center rounded-[3px]"
              >
                <span className='hidden md:block'>Next</span>  <ChevronRightIcon className='size-5' />
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  );
}