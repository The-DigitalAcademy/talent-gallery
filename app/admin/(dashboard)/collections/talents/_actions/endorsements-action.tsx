"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

const FormSchema = z.object({
    message: z
        .string()
        .trim()
        .min(2, { message: 'message must be at least 2 characters long.' })
        .max(250, { message: 'message cannot exceed 250 characters.' }),
    name: z
        .string()
        .trim()
        .min(2, { message: 'name must be at least 2 characters long.' })
        .max(50, { message: 'name cannot exceed 50 characters.' }),
});

export async function insertEndorsement(talentId: string | null, prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = FormSchema.safeParse({
        message: formData.get('message'),
        name: formData.get('name')
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { message, name } = validatedFields.data;

    try {
        const supabase = await createClient()
        const { error } = await supabase.from("endorsements").insert({ talent_id: talentId, message, endorser_name: name })
        if (error) throw error

        revalidatePath(`/admin/collections/talents/${talentId}`)
        return {
            success: true,
            message: 'Success! Item added',
        };

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'A database error occurred. Please try again.',
        };
    }
}

export async function deleteEndorsement(id: string, talentId: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("endorsements").delete().eq('id', id)
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