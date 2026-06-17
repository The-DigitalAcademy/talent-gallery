// app/talents/page.tsx
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
  
  // Must match the itemsPerPage math inside your actions.ts file!
  const itemsPerPage = 12;

  const [
    talentResult, // 💡 Grabs the new returned object wrapper
    { data: cohorts },
    { data: locations },
    { data: programs },
    { data: statuses },
    { data: capabilities }
  ] = await Promise.all([
    getFilteredTalents(filters),
    supabase.from("cohorts").select("id, name"),
    supabase.from("locations").select("id, city"),
    supabase.from("programs").select("id, name"),
    supabase.from("talent_statuses").select("id, name"),
    supabase.from("capabilities").select("id, name")
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
    <div className="min-h-screen bg-slate-50/50 pb-12">
      
      {/* 💻 GLOBAL BRAND NAVBAR */}
      <header className="bg-white border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 overflow-hidden w-[140px] flex items-center justify-start">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-12 w-auto max-w-none object-contain -ml-6 -mr-8" 
              />
            </div>
            <span className="text-4xl font-bold tracking-tight text-blue-600 font-sans leading-none pt-[2px]">
              Talent
            </span>
          </div>
          <p className="text-[13px] text-slate-500 font-medium mt-3">
            Discover and connect with our talented learners
          </p>
        </div>
      </header>

      {/* MAIN CONTAINER LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* FILTER BOX CONTAINER */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base tracking-tight">
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            <h2>Filter Talent</h2>
          </div>

          <FilterControls 
            locations={locations || []}
            programs={programs || []}
            cohorts={cohorts || []}
            statuses={statuses || []}
            capabilities={capabilities || []}
          />
        </div>

        {/* 📊 ACCURATE DYNAMIC RECONCILIATION COUNT COUNTER */}
        <div className="text-xs text-slate-500 font-semibold px-1">
          Showing <span className="text-blue-600 font-bold">{talents.length}</span> of{" "}
          <span className="text-slate-800 font-bold">{totalCount}</span> total talent profiles
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

        {/* 🔘 PAGINATION PANEL */}
        {totalCount > 0 && (
          <div className="flex items-center justify-center gap-4 pt-8">
            {currentPage > 1 && (
              <Link 
                href={buildPaginationUrl(currentPage - 1)}
                className="bg-white border border-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-slate-50 shadow-sm transition-colors"
              >
                ← Previous Page
              </Link>
            )}
            
            <span className="text-sm font-semibold text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-lg">
              Page {currentPage} of {totalPages}
            </span>

            {/* 💡 THE KILL SWITCH: Disappears if you hit the final mathematically determined chunk */}
            {currentPage < totalPages && (
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