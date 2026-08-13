"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

const FormSchema = z.object({
    description: z
        .string()
        .trim()
        .min(2, { message: 'description must be at least 2 characters long.' })
        .max(2000, { message: 'description cannot exceed 2000 characters.' }),
    name: z
        .string()
        .trim()
        .min(2, { message: 'name must be at least 2 characters long.' })
        .max(50, { message: 'name cannot exceed 50 characters.' }),
    url: z.url().trim().or(z.literal("")).optional()
});

export async function insertProject(talentId: string | null, prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = FormSchema.safeParse({
        description: formData.get('description'),
        name: formData.get('name'),
        url: formData.get('url')
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                description: formData.get('description'),
                name: formData.get('name'),
                url: formData.get('url')
            }
        };
    }

    const { description, name, url } = validatedFields.data;

    try {
        const supabase = await createClient()
        const { error } = await supabase.from("projects").insert({ talent_id: talentId, description, name, project_url: url })
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

export async function deleteProject(id: string, talentId: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("projects").delete().eq('id', id)
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