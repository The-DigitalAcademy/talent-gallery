import TalentCardSkeleton from "./TalentCardSkeleton";

export default function TalentGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {Array.from({ length: 12 }).map((_, i) => (
        <TalentCardSkeleton key={i} />
      ))}
    </div>
  );
}