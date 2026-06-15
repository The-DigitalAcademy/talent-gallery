import FilterControls from '../components/ui/FilterControls'; 
import TalentCard from '../components/ui/TalentCard';
import { getFilteredTalents, FilterParams } from './actions';
import Link from "next/link";
import { createClient } from '../lib/supabase/server'; 

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

  // 💡 FIX: Ensure getFilteredTalents receives the evaluated number or updated params object
  const [
    rawTalents,
    { data: cohorts },
    { data: locations },
    { data: programs },
    { data: statuses },
    { data: capabilities }
  ] = await Promise.all([
    getFilteredTalents({ ...filters, page: currentPage.toString() }), 
    supabase.from("cohorts").select("id, name"),
    supabase.from("locations").select("id, city"),
    supabase.from("programs").select("id, name"),
    supabase.from("talent_statuses").select("id, name"),
    supabase.from("capabilities").select("id, name")
  ]);

  const talents = (rawTalents as unknown as ConfirmedTalentSchema[]) || [];

  const buildPaginationUrl = (pageTarget: number) => {
    const nextParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val) nextParams.set(key, val);
    });
    nextParams.set("page", pageTarget.toString());
    return `/talent?${nextParams.toString()}`; 
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">

      {/* 💻 GLOBAL BRAND NAVBAR */}
      <header className="bg-white border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto -mt-4 ">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img 
                src="https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/shaper_logo.png" 
                alt="Logo" 
                className="h-12 w-auto max-w-none object-contain -ml-2 -mr-3 pt-[5px]" 
              />
            </div>
            <span className="text-3xl font-bold tracking-tight text-blue-900 font-sans leading-none pt-[10px]">
              Talent
            </span>
          </div>
          <p className="text-[13px] text-slate-500 font-medium ">
            Discover and connect with our talented learners
          </p>
        </div>
      </header>

      {/* MAIN CONTAINER LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* FILTER BOX CONTAINER */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold orange-500 text-base tracking-tight">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-orange-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            <h2 className='text-blue-900'>Filter Talent</h2>
          </div>

          <FilterControls 
            locations={locations || []}
            programs={programs || []}
            cohorts={cohorts || []}
            statuses={statuses || []}
            capabilities={capabilities || []}
          />
        </div>

        {/* Dynamic Results Counter */}
        <div className="text-xs text-slate-500 font-semibold px-1">
          Showing <span className="text-blue-600 font-bold">{talents.length}</span> talent profiles
        </div>

        {/* Talent Cards Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {talents.length === 0 ? (
            <div className="col-span-full bg-white text-center py-16 border rounded-2xl shadow-sm">
              <p className="text-slate-400 font-medium">No talent profiles found matching your settings.</p>
            </div>
          ) : (
            talents.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))
          )}
        </div>

        {/* PAGINATION HUBS */}
        {talents.length > 0 && (
          <div className="flex items-center justify-center gap-4 pt-6">
            {currentPage > 1 && (
              <Link 
                href={buildPaginationUrl(currentPage - 1)}
                className="bg-white border border-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-slate-50 shadow-sm transition-colors"
              >
                ← Previous Page
              </Link>
            )}
            
            <span className="text-sm font-semibold text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-lg">
              Page {currentPage}
            </span>

            {/* If we received less than 9 elements, we reached the last page */}
            {talents.length === 9 && (
              <Link 
                href={buildPaginationUrl(currentPage + 1)}
                className="bg-white border border-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-slate-50 shadow-sm transition-colors"
              >
                Next Page →
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  );
}