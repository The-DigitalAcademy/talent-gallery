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
  await new Promise((resolve) => setTimeout(resolve, 5000))
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6 space-y-6 pt-10">

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
        {totalCount > 0 && (
          <div className="flex items-center justify-center gap-1 pt-8">
            {currentPage > 1 && (
              <Link
                href={buildPaginationUrl(currentPage - 1)}
                className="bg-white px-4 h-9 flex items-center justify-center rounded-[3px]"
              >
                <ChevronLeftIcon className='size-5' /> Previous
              </Link>
            )}
            <div className='flex gap-1'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <Link
                  key={pageNum}
                  href={buildPaginationUrl(pageNum)}
                  className={clsx('rounded flex items-center justify-center size-9', { "bg-gray-900 text-white": pageNum == currentPage }, { "bg-white": pageNum != currentPage })}>
                  {pageNum}
                </Link>
              ))}
            </div>

            {/*  THE KILL SWITCH: Disappears if you hit the final mathematically determined chunk */}
            {currentPage < totalPages && (
              <Link
                href={buildPaginationUrl(currentPage + 1)}
                className="bg-white px-4 h-9 flex items-center justify-center rounded-[3px]"
              >
                Next <ChevronRightIcon className='size-5' />
              </Link>
            )}
          </div>
        )}

      </div>
      <button className='inline sticky bottom-10 left-[90vw] text-white bg-red-600 rounded p-3 m-4'><ClipboardListIcon className='size-8' /></button>
    </div>
  );
}