"use server";
import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function insertCapability(capabilityId: string, talentId: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("talent_capabilities").insert({ talent_id: talentId, capability_id: capabilityId })
        if (error) throw error

        revalidatePath(`/admin/collections/talents/${talentId}`);
        return {
            success: true,
            message: 'Success! Item created',
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'A database error occurred. Please try again.',
        };
    }
}
export async function deleteCapability(capabilityId: string, talentId: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("talent_capabilities").delete().eq('capability_id', capabilityId).eq("talent_id", talentId)
        if (error) throw error

        revalidatePath(`/admin/collections/talents/${talentId}`);
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