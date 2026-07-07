"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

const FormSchema = z.object({
    company: z
        .string()
        .trim()
        .min(2, { message: 'company must be at least 2 characters long.' })
        .max(50, { message: 'company cannot exceed 50 characters.' }),
    role: z
        .string()
        .trim()
        .min(2, { message: 'role must be at least 2 characters long.' })
        .max(50, { message: 'role cannot exceed 50 characters.' }),
    duration: z
        .string()
        .trim()
        .min(2, { message: 'duration must be at least 2 characters long.' })
        .max(50, { message: 'duration cannot exceed 50 characters.' }),
    description: z
        .string()
        .trim()
        .min(2, { message: 'description must be at least 2 characters long.' })
        .max(250, { message: 'description cannot exceed 250 characters.' })
});

export async function insertWorkExperience(talentId: string | null, prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = FormSchema.safeParse({
        company: formData.get('company'),
        role: formData.get('role'),
        duration: formData.get('duration'),
        description: formData.get('description')
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                company: formData.get('company'),
                role: formData.get('role'),
                duration: formData.get('duration'),
                description: formData.get('description')
            }
        };
    }

    const { company, role, duration, description } = validatedFields.data;

    try {
        const supabase = await createClient()
        const { error, data } = await supabase.from("work_experiences").insert({ talent_id: talentId, company, role, duration, description })
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

export async function deleteWorkExperience(id: string, talentId: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("work_experiences").delete().eq('id', id)
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