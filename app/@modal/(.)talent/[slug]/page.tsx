import { notFound } from "next/navigation";
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
      notFound()
    }
    
  return (
    <ModalClient talent={talent}/>
  )
}
