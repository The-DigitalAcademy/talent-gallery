"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { requireAdmin } from "@/app/lib/auth/requireAdmin";
import { revalidatePath } from "next/cache";
import z from "zod";

const Schema = z.object({
    institution: z
        .string()
        .trim()
        .min(2, { message: 'company must be at least 2 characters long.' })
        .max(50, { message: 'company cannot exceed 50 characters.' }),
    qualification: z
        .string()
        .trim()
        .min(2, { message: 'role must be at least 2 characters long.' })
        .max(50, { message: 'role cannot exceed 50 characters.' }),
    duration: z
        .string()
        .trim()
        .min(2, { message: 'duration must be at least 2 characters long.' })
        .max(50, { message: 'duration cannot exceed 50 characters.' }),
    fieldOfStudy: z
        .string()
        .trim()
        .max(2000, { message: 'description cannot exceed 2000 characters.' })
        .nullable().optional()
});

type SchemaType = z.infer<typeof Schema>

export async function insertEducation(talentId: string, data: SchemaType): Promise<FormState> {
    await requireAdmin();
    const validatedFields = Schema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { institution, qualification, duration, fieldOfStudy } = validatedFields.data;

    try {
        const supabase = await createClient()
        console.log("in here")
        const { error, data } = await supabase.from("education").insert({ talent_id: talentId, institution, duration, qualification_id: "354ae6ed-1c89-4ee7-b74b-f07ce6332b1a", field_of_study_id: "354ae6ed-1c89-4ee7-b74b-f07ce6332b1a" })
        console.log({data})
        console.log({error})
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

export async function deleteEducation(id: string, talentId: string) {
    await requireAdmin();
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