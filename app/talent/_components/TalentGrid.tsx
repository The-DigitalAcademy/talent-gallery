
import TalentCard from "@/app/components/ui/TalentCard";
import { FilterParams, getFilteredTalents } from "../actions";

export default async function TalentGrid({
  filters,
}: {
  filters: FilterParams;
}) {
  const result = await getFilteredTalents(filters);

  const talents = result.data ?? [];

  if (!talents.length) {
    return (
      <div className="col-span-full bg-white text-center py-16 border rounded-2xl">
        No talent found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {talents.map((talent) => (
        <TalentCard key={talent.id} talent={talent} />
      ))}
    </div>
  );
}