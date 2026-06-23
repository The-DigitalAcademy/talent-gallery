import { SkillTag } from "@/app/components/ui/SkillTag";


interface ProjectCardProps {
  title: string;
  description: string;
  capabilities: string[];
}

export function ProjectCard({
  title,
  description,
  capabilities,
}: ProjectCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 space-y-3">
      <h4 className="font-semibold text-gray-900 text-base">{title}</h4>
      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>

      {capabilities?.length > 0 &&
        <div>
          <p className="text-xs text-gray-600 font-medium mb-2">Technologies Used:</p>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((capability, key) => (
              <SkillTag key={key} label={capability} bgColor="bg-gray-200" />
            ))}
          </div>
        </div>
      }
    </div>
  );
}