"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { requireAdmin } from "@/app/lib/auth/requireAdmin";
import { revalidatePath } from "next/cache";
import z from "zod";

const Schema = z.object({
    summary: z
        .string()
        .trim()
        .max(2000, { message: 'summary cannot exceed 2000 characters.' })
        .nullable(),
});

type SchemaType = z.infer<typeof Schema>

export async function upsertCapabilitiesSummary(talentId: string, data: SchemaType): Promise<Omit<FormState, "fields"> & { data?: SchemaType }> {
    await requireAdmin();
    const validatedFields = Schema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const supabase = await createClient()
        const { error, data: updatedData } = await supabase.from("talents")
            .update({ capabilities_summary: validatedFields.data.summary })
            .eq('id', talentId)
            .select("summary:capabilities_summary").single()
        if (error) throw error

        return {
            success: true,
            message: 'Success! Item updated',
            data: updatedData
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'A database error occurred. Please try again.',
        };
    }
}