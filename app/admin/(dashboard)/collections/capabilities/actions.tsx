// app/actions.ts
'use server'

import { createClient } from '@/app/lib/supabase/server';
import { requireAdmin } from '@/app/lib/auth/requireAdmin';
import { revalidatePath } from 'next/cache';

// 2. Define the shape of our form response state
export type FormState = {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
    };
};

export async function addCapability(name: string): Promise<FormState> {
    await requireAdmin();

    if (typeof name !== "string" || !name.trim().length) {
        return {
            success: false,
            message: 'invalid `name` value',
        }
    }
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("capabilities").insert({ name })
        if (error) throw error

        revalidatePath("/admin/collections/capabilities");
        return {
            success: true,
            message: 'Success! Item created',
        }
    } catch (error: any) {
        if (error?.code === "23505") {
            return {
                success: false,
                message: `Capability '${name}' already exists`,
            };
        }
        console.log(error)
        return {
            success: false,
            message: 'A database error occurred. Please try again.',
        };
    }
}
export async function deleteCapability(id: string): Promise<FormState> {
    await requireAdmin();
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
