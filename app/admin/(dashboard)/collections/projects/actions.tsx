// app/actions.ts
'use server'

import { createClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// 1. Define the validation schema
const FormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(50, { message: 'Name cannot exceed 50 characters.' }),
    description: z
        .string()
        .trim()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(250, { message: 'Name cannot exceed 250 characters.' })
});

// 2. Define the shape of our form response state
export type FormState = {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
        description?: string[];
    };
};

export async function createProject(prevState: FormState, formData: FormData): Promise<FormState> {
    // Extract and validate raw form entries using the schema
    const validatedFields = FormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    });

    // If validation fails, format the Zod errors and return them to the UI
    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields below.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // At this point, the data is completely valid and strictly typed
    const { name, description } = validatedFields.data;

    try {
        // Perform database operations here (e.g., db.insert({ name, description }))
        console.log('Successfully validated and saved:', { name, description });
        const supabase = await createClient()
        const { error } = await supabase.from("projects").insert({ name, description })
        if (error) throw error

        revalidatePath("/admin/collections/projects");
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

export async function updateProject(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
    // Extract and validate raw form entries using the schema
    const validatedFields = FormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
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
    const { name, description } = validatedFields.data;

    try {
        // Perform database operations here (e.g., db.insert({ name, description }))
        console.log('Successfully validated', { name, description });
        const supabase = await createClient()
        const { error } = await supabase.from("projects").update({ name, description }).eq('id', id)
        if (error) throw error

        revalidatePath("/admin/collections/projects");
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

export async function deleteProject(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("projects").delete().eq('id', id)
        if (error) throw error

        revalidatePath("/admin/collections/projects");
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
