"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { requireAdmin } from "@/app/lib/auth/requireAdmin";
import z from "zod";

const Schema = z.object({
    youtube: z.url("Invalid URL").or(z.literal("")).nullable().optional(),
    portfolio: z.url("Invalid URL").or(z.literal("")).nullable().optional(),
    linkedin: z.url("Invalid URL").or(z.literal("")).nullable().optional(),
    github: z.url("Invalid URL").or(z.literal("")).nullable().optional(),
});

type SchemaType = z.infer<typeof Schema>

interface DbPayload {
    youtube_url?: string | null,
    portfolio_url?: string | null,
    linkedin_url?: string | null,
    github_url?: string | null
}

export async function upsertUrls(talentId: string, data: SchemaType): Promise<Omit<FormState, "fields"> & { data?: SchemaType }> {
    await requireAdmin();
    // Extract and validate raw form entries using the schema
    const validatedFields = Schema.safeParse(data);

    // If validation fails, format the Zod errors and return them to the UI
    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const keyMap = {
        youtube: "youtube_url",
        portfolio: "portfolio_url",
        linkedin: "linkedin_url",
        github: "github_url",
    }

    // Only assign if the value exists in validatedFields.data
    const payload = Object.entries(keyMap).reduce<DbPayload>((acc, [oldKey, newKey]) => {
        const value = validatedFields.data[oldKey as keyof SchemaType]
        if (value !== undefined) acc[newKey as keyof DbPayload] = value
        return acc;
    }, {})

    // update
    try {
        const supabase = await createClient()
        const { error, data: updatedData } = await supabase.from("talents")
            .update(payload)
            .eq('id', talentId)
            .select("youtube:youtube_url, portfolio:portfolio_url, linkedin:linkedin_url, github:github_url")
            .single()
        if (error) throw error

        return {
            success: true,
            message: 'Success! Item updated',
            data: updatedData
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'A database error occurred. Please try again.',
        };
    }
}