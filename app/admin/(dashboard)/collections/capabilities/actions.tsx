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
        .max(50, { message: 'Name cannot exceed 50 characters.' })
});

// 2. Define the shape of our form response state
export type FormState = {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
    };
};

export async function createCapability(prevState: FormState, formData: FormData): Promise<FormState> {
    // Extract and validate raw form entries using the schema
    const validatedFields = FormSchema.safeParse({
        name: formData.get('name')
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
    const { name } = validatedFields.data;

    try {
        // Perform database operations here (e.g., db.insert({ name, description }))
        console.log('Successfully validated and saved:', { name });
        const supabase = await createClient()
        const { error } = await supabase.from("capabilities").insert({ name })
        if (error) throw error

        revalidatePath("/admin/collections/capabilities");
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

export async function updateCapability(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
    // Extract and validate raw form entries using the schema
    const validatedFields = FormSchema.safeParse({
        name: formData.get('name')
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
    const { name } = validatedFields.data;

    try {
        // Perform database operations here (e.g., db.insert({ name, description }))
        console.log('Successfully validated', { name });
        const supabase = await createClient()
        const { error } = await supabase.from("capabilities").update({ name }).eq('id', id)
        console.log({ error })
        if (error) throw error

        revalidatePath("/admin/collections/capabilities");
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

export async function deleteCapability(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("capabilities").delete().eq('id', id)
        if (error) throw error

        revalidatePath("/admin/collections/capabilities");
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
