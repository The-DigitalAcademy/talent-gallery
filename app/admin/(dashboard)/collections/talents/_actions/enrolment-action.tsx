"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { requireAdmin } from "@/app/lib/auth/requireAdmin";
import { revalidatePath } from "next/cache";
import z from "zod";

const Schema = z.object({
    program: z.uuid({ error: "required" }).nullable().optional(),
    cohort: z.uuid({ error: "required" }).nullable().optional(),
    location: z.uuid({ error: "required" }).nullable().optional(),
    status: z.uuid({ error: "required" }).nullable().optional(),
});

type SchemaType = z.infer<typeof Schema>

interface DbPayload {
    program_id?: string | null;
    cohort_id?: string | null;
    location_id?: string | null;
    talent_status_id?: string | null;
}

export async function upsertEnrolmentInfo(talentId: string, data: SchemaType): Promise<Omit<FormState, "fields"> & { data?: SchemaType }> {
    await requireAdmin();
    // Extract and validate raw form entries using the schema
    const validatedFields = Schema.safeParse(data);

    // If validation fails, format the Zod errors and return them to the UI
    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const keyMap = {
        program: "program_id",
        cohort: "cohort_id",
        location: "location_id",
        status: "talent_status_id"
    }

    // Only assign if the value exists in validatedFields.data
    const payload = Object.entries(keyMap).reduce<DbPayload>((acc, [oldKey, newKey]) => {
        const value = validatedFields.data[oldKey as keyof SchemaType]
        if (value !== undefined) acc[newKey as keyof DbPayload] = value
        return acc;
    }, {})

    // update
    try {
        const supabase = await createClient()
        const { error, data: updatedData } = await supabase.from("talents")
            .update(payload)
            .eq('id', talentId)
            .select("program:program_id, cohort:cohort_id, location:location_id, status:talent_status_id").single()

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