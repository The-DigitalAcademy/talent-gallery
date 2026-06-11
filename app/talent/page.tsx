// app/talents/page.tsx
import FilterControls from '../components/ui/FilterControls'; 
import TalentCard from '../components/ui/TalentCard';
import { getFilteredTalents, FilterParams } from './actions';

import { createClient } from '../lib/supabase/server'; // Adjust this path to match your server client location

interface PageProps {
  searchParams: Promise<FilterParams>;
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
  const filters = await searchParams;
  const supabase = await createClient();

  // 1. Fetch filtered talents and dropdown options in parallel
  const [
    rawTalents,
    { data: locations },
    { data: programs },
    { data: cohorts },
    { data: statuses },
    { data: capabilities }
  ] = await Promise.all([
    getFilteredTalents(filters),
    supabase.from("locations").select("id, city"),
    supabase.from("programs").select("id, name"),
    supabase.from("cohorts").select("id, name"),
    supabase.from("talent_statuses").select("id, name"),
    supabase.from("capabilities").select("id, name")
  ]);

  const talents = (rawTalents as unknown as ConfirmedTalentSchema[]) || [];

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* 2. Pass the live database arrays straight into your control filters */}
        <FilterControls 
          locations={locations || []}
          programs={programs || []}
          cohorts={cohorts || []}
          statuses={statuses || []}
          capabilities={capabilities || []}
        />

        <div className="text-sm text-slate-600 font-medium px-1">
          Showing <span className="text-blue-600 font-bold">{talents.length}</span> of{' '}
          <span className="font-bold">{talents.length}</span> talent profiles
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {talents.length === 0 ? (
            <div className="col-span-full bg-white text-center py-16 border rounded-2xl shadow-sm">
              <p className="text-slate-400 font-medium">No talent profiles match your current filter settings.</p>
            </div>
          ) : (
            talents.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}