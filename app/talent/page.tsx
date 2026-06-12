// app/talents/page.tsx
import FilterControls from '../components/ui/FilterControls'; 
import TalentCard from '../components/ui/TalentCard';
import { getFilteredTalents, FilterParams } from './actions';
import Link from "next/link";
import { createClient } from '../lib/supabase/server'; 

// 💡 THE FIX: Extended the original FilterParams type to include the optional page property cleanly
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
  // TypeScript is now completely happy tracking the `.page` property string here:
  const currentPage = Math.max(1, parseInt(filters.page || "1", 10));

  const [
    rawTalents,
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
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <FilterControls 
          locations={locations || []}
          programs={programs || []}
          cohorts={cohorts || []}
          statuses={statuses || []}
          capabilities={capabilities || []}
        />

        <div className="text-sm text-slate-600 font-medium px-1">
          Showing page <span className="text-blue-600 font-bold">{currentPage}</span> of results
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {talents.length === 0 ? (
            <div className="col-span-full bg-white text-center py-16 border rounded-2xl shadow-sm">
              <p className="text-slate-400 font-medium">No talent profiles found on this page matching your settings.</p>
            </div>
          ) : (
            talents.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))
          )}
        </div>

        {/* PAGINATION PANEL */}
        {talents.length > 0 && (
          <div className="flex items-center justify-center gap-4 pt-8 pb-4">
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

            {talents.length === 12 && (
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