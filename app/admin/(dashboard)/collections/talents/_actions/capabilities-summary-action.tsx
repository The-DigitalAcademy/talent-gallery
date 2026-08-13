"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

const FormSchema = z.object({
    summary: z
        .string()
        .trim()
        .max(2000, { message: 'summary cannot exceed 2000 characters.' }),
});

export async function updateCapabilitiesSummary(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = FormSchema.safeParse({ summary: formData.get('summary') });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                summary: formData.get('summary'),
            }
        };
    }

    try {
        const supabase = await createClient()
        const { error } = await supabase.from("talents").update({ capabilities_summary: validatedFields.data.summary }).eq('id', id)
        if (error) throw error

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