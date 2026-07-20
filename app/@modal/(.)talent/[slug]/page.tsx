import ModalClient from "./components/ModalClient";
import { getTalentBySlug } from "@/app/lib/talents/getTalentBySlug";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const { data: talent, error } = await getTalentBySlug(slug);

    if (error) {
        return (
        <main className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Failed to load talent profile.</p>
        </main>
        );
    }
    
  return (
    <ModalClient talent={talent}/>
  )
}
