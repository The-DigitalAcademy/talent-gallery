"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

const FormSchema = z.object({
    program: z.uuid({ error: "required" }),
    cohort: z.uuid({ error: "required" }),
    location: z.uuid({ error: "required" }),
    status: z.uuid({ error: "required" }),
});

export async function upsertEnrolmentInfo(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
    // Extract and validate raw form entries using the schema
    const validatedFields = FormSchema.safeParse({
        program: formData.get('program'),
        cohort: formData.get('cohort'),
        location: formData.get('location'),
        status: formData.get('status'),
    });

    // If validation fails, format the Zod errors and return them to the UI
    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // At this point, the data is completely valid and strictly typed
    const { program, cohort, location, status } = validatedFields.data;

    // update
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("talents")
            .update({
                program_id: program,
                cohort_id: cohort,
                location_id: location,
                talent_status_id: status
            })
            .eq('id', id)
        if (error) throw error

        revalidatePath("/admin/collections/talents");
        revalidatePath(`/admin/collections/talents/${id}`);
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