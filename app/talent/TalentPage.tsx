// app/talents/page.tsx
import FilterControls from '../components/ui/FilterControls'; // Client component for interactive filters
import { getFilteredTalents, FilterParams } from './actions';
import TalentCard from '../components/ui/TalentCard';


interface PageProps {
  searchParams: Promise<FilterParams>;
}

export default async function TalentsPage({ searchParams }: PageProps) {
  const filters = await searchParams;
  const talents = await getFilteredTalents(filters);

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Dynamic Client Filter Card Box */}
        <FilterControls />

        {/* Dynamic Results Counter */}
        <div className="text-sm text-slate-600 font-medium px-1">
          Showing <span className="text-blue-600 font-bold">{talents.length}</span> of{' '}
          <span className="font-bold">{talents.length}</span> talent profiles
        </div>

        {/* Exact Grid Layout Display */}
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