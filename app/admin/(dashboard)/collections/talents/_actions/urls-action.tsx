"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

const FormSchema = z.object({
    youtube: z.url("Invalid URL").or(z.literal("")).optional(),
    portfolio: z.url("Invalid URL").or(z.literal("")).optional(),
    linkedin: z.url("Invalid URL").or(z.literal("")).optional(),
    github: z.url("Invalid URL").or(z.literal("")).optional(),
});

export async function upsertUrls(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
    // Extract and validate raw form entries using the schema
    const validatedFields = FormSchema.safeParse({
        youtube: formData.get('youtube'),
        portfolio: formData.get('portfolio'),
        linkedin: formData.get('linkedin'),
        github: formData.get('github'),
    });

    // If validation fails, format the Zod errors and return them to the UI
    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                youtube: formData.get('youtube'),
                portfolio: formData.get('portfolio'),
                linkedin: formData.get('linkedin'),
                github: formData.get('github')
            }
        };
    }

    // At this point, the data is completely valid and strictly typed
    const { youtube, portfolio, linkedin, github } = validatedFields.data;

    // update
    try {
        const supabase = await createClient()
        const { error } = await supabase.from("talents")
            .update({
                youtube_url: youtube,
                portfolio_url: portfolio,
                linkedin_url: linkedin,
                github_url: github
            })
            .eq('id', id)
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