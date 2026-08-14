import { ConfirmedTalentSchema } from "@/app/interface-types/talent";
import { createClient } from "@/app/lib/supabase/server";
import TalentGrid from "@/app/talent/_components/TalentGrid";
import TalentGridSkeleton from "@/app/talent/_components/TalentGridSkeleton";
import { FilterParams, getFilteredTalents } from "@/app/talent/actions";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon, ClipboardListIcon } from 'lucide-react';
import { Suspense } from "react";
import FilterControls from "../ui/FilterControls";
import { Montserrat } from 'next/font/google';
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] })

interface ExtendedFilterParams extends FilterParams {
  page?: string;
}

interface TalentSectionInterface {
   searchParams: Promise<ExtendedFilterParams>;
   cohort?: string | undefined;
   basePath?: string;
}

export default async function TalentSection({searchParams, cohort = undefined, basePath = "/talent"}: TalentSectionInterface) {
    const supabase = await createClient();

  const rawFilters = await searchParams;

  const filters: ExtendedFilterParams = {
    ...rawFilters,
    ...(cohort ? { cohort } : {}),
  };

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

  // Filter by cohort name if a cohort value was passed in
  const filteredTalents = cohort
    ? talents.filter(
        (talent) => talent.cohort?.name?.toLowerCase().includes(cohort.toLowerCase())
      )
    : talents;

  const totalCount = cohort ? filteredTalents.length : (talentResult?.count || 0);

  // Calculate total pages dynamically based on database state matching filters
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  const buildPaginationUrl = (pageTarget: number) => {
    const nextParams = new URLSearchParams();

    Object.entries(rawFilters).forEach(([key, val]) => {
      if (val) nextParams.set(key, val as string);
    });
    nextParams.set("page", pageTarget.toString());
    return `${basePath}?${nextParams.toString()}`;
  };

    return (
        <div className={`${montserrat.className} bg-[#f1f1f1] pb-12`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 space-y-6 pt-10">
                {cohort &&
                    <h1 className="text-2xl sm:text-3xl font-bold leading-snug tracking-wide uppercase text-center">
                        {cohort}
                    </h1>
                }
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
                    Showing {filteredTalents.length} of {totalCount} talent
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
                        {totalPages > 1 && (
                            <Link
                                href={buildPaginationUrl(totalPages)}
                                className={clsx(
                                'rounded flex items-center justify-center size-8 md:size-9',
                                { "bg-gray-900 text-white": totalPages == currentPage },
                                { "bg-white": totalPages != currentPage },)}>
                                {totalPages}
                            </Link>
                        )}
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