import { SkillTag } from "@/app/components/ui/SkillTag";


interface ProjectCardProps {
  title: string;
  description: string;
  contributions: string[] | null;
  technologies: string[];
}

export function ProjectCard({
  title,
  description,
  contributions,
  technologies,
}: ProjectCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 space-y-3">
      <h4 className="font-bold text-gray-900 text-base">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>

      <div>
        <p className="text-xs text-gray-500 font-medium mb-2">Key Contributions:</p>
        <ul className="list-disc list-inside space-y-1">
          {contributions?.map((item, i) => (
            <li key={i} className="text-sm text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs text-gray-500 font-medium mb-2">Technologies Used:</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <SkillTag key={tech} label={tech} bgColor="bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}