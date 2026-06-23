"use server";
import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteTalent(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("talents").delete().eq('id', id)
        if (error) throw error

        revalidatePath("/admin/collections/talents");
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'A database error occurred. Please try again.',
        };
    }
    redirect("/admin/collections/talents");
}