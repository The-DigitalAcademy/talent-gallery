"use server";
import { createClient } from "@/app/lib/supabase/server";
import { requireAdmin } from "@/app/lib/auth/requireAdmin";

export async function updateCapabilities(talentId: string, capabilities: string[]) {
    await requireAdmin();

    try {
        const supabase = await createClient()
        const { error, data } = await supabase.from("talents").update({ capabilities }).eq("id", talentId)
        if (error) throw error

        return {
            success: true,
            message: 'Success! Item deleted',
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'A database error occurred. Please try again.',
        };
    }
}