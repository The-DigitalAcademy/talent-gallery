import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  title: string;
  icon: React.ReactNode;
  className?: string;
}

export function SectionHeading({ title, icon }: SectionHeadingProps) {
  return (
    <div className={cn("flex items-center gap-2")}>
      <span className="text-orange-500 shrink-0">{icon}</span>
      <h3 className="text-[#01317F] font-semibold text-lg">{title}</h3>
    </div>
  );
}