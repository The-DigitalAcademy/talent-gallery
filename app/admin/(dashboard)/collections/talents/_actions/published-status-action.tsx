"use server";
import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateIsPublished(talentId: string, isPublished: boolean) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("talents").update({ is_published: isPublished }).eq('id', talentId)
        if (error) throw error

        revalidatePath(`/admin/collections/talents/${talentId}`);
        revalidatePath("/admin/collections/talents");
        return {
            success: true,
            message: 'Success! Item updated',
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'A database error occurred. Please try again.',
        };
    }
}