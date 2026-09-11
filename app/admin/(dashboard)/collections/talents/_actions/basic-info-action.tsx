"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { requireAdmin } from "@/app/lib/auth/requireAdmin";
import { redirect } from "next/navigation";
import z from "zod";

const Schema = z.object({
    fullname: z
        .string()
        .trim()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(50, { message: 'Name cannot exceed 50 characters.' }).nullable().optional(),
    bio: z
        .string()
        .trim()
        .min(2, { message: 'bio must be at least 2 characters long.' })
        .max(2000, { message: 'Name cannot exceed 2000 characters.' }).or(z.literal("")).nullable().optional(),
    profileImageUrl: z.url("Invalid URL").nullable().optional(),
    roleId: z.uuid({ error: "required" }).nullable().optional()
});
const CreateSchema = z.object({
    fullname: z
        .string()
        .trim()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(50, { message: 'Name cannot exceed 50 characters.' }),
    bio: z
        .string()
        .trim()
        .min(2, { message: 'bio must be at least 2 characters long.' })
        .max(2000, { message: 'Name cannot exceed 2000 characters.' }).or(z.literal("")).nullable().optional(),
    profileImageUrl: z.url("Invalid URL").nullable().optional(),
    roleId: z.uuid({ error: "required" }).nullable().optional()
});

interface DbPayload {
    fullname?: string | null,
    bio?: string | null,
    profile_image_url?: string | null,
    role_id?: string | null
}

type SchemaType = z.infer<typeof Schema>

export async function upsertBasicInfo(talentId: string | null, data: SchemaType): Promise<Omit<FormState, "fields"> & { data?: SchemaType }> {
    await requireAdmin();
    const validatedFields = talentId ? Schema.safeParse(data) : CreateSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const keyMap = {
        fullname: "fullname",
        bio: "bio",
        profileImageUrl: "profile_image_url",
        roleId: "role_id",
    }

    // Only assign if the value exists in validatedFields.data
    const payload = Object.entries(keyMap).reduce<DbPayload>((acc, [oldKey, newKey]) => {
        const value = validatedFields.data[oldKey as keyof SchemaType]
        if (value !== undefined) acc[newKey as keyof DbPayload] = value
        return acc;
    }, {})

    if (talentId === null) {
        // insert
        let newItemId
        try {
            const supabase = await createClient()
            const { error, data } = await supabase.from("talents").insert(payload).select("id, fullname, bio, profileImageUrl:profile_image_url, roleId:role_id").single()
            if (error) throw error
            newItemId = data.id;
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: 'A database error occurred. Please try again.',
            };
        }

        redirect(`/admin/collections/talents/${newItemId}`)
    } else {
        // update
        try {
            const supabase = await createClient()
            const { error, data: updatedData } = await supabase.from("talents").update(payload)
                .eq('id', talentId).select("fullname, bio, profileImageUrl:profile_image_url, roleId:role_id").single()
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
}