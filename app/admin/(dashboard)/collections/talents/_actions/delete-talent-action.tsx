"use server";
import { createClient } from "@/app/lib/supabase/server";
import { requireAdmin } from "@/app/lib/auth/requireAdmin";
import { revalidatePath } from "next/cache";
import { FormState } from "@/app/lib/definitions";

export default async function deleteTalent(id: string): Promise<FormState> {
    await requireAdmin();
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("talents").delete().eq('id', id)
        if (error) throw error

        revalidatePath("/admin/collections/talents");
        return {
            success: true,
            message: "talent deleted"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'A database error occurred. Please try again.',
        };
    }
}