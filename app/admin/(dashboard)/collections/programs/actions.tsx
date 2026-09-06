// app/actions.ts
'use server'

import { createClient } from '@/app/lib/supabase/server';
import { requireAdmin } from '@/app/lib/auth/requireAdmin';
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

export async function upsert(id: string | null, prevState: FormState, formData: FormData): Promise<FormState> {
    await requireAdmin();
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

    if (id === null) {
        // insert
        try {
            // Perform database operations here (e.g., db.insert({ name, description }))
            console.log('Successfully validated and saved:', { name });
            const supabase = await createClient()
            const { error } = await supabase.from("programs").insert({ name })
            if (error) throw error

            revalidatePath("/admin/collections/programs");
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
    } else {
        // update
        try {
            const supabase = await createClient()
            const { error } = await supabase.from("programs").update({ name }).eq('id', id)
            if (error) throw error

            revalidatePath("/admin/collections/programs");
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
}

export async function deleteProgram(id: string) {
    await requireAdmin();
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("programs").delete().eq('id', id)
        if (error) throw error

        revalidatePath("/admin/collections/programs");
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
