"use server";
import { FormState } from "@/app/lib/definitions";
import { createClient } from "@/app/lib/supabase/server";
import { slugify } from "@/app/lib/utils";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
    fullname: z
        .string()
        .trim()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(50, { message: 'Name cannot exceed 50 characters.' }),
    bio: z
        .string()
        .trim()
        .min(2, { message: 'bio must be at least 2 characters long.' })
        .max(2000, { message: 'Name cannot exceed 2000 characters.' }),
    image: z
        .any()
        // Convert the empty browser placeholder into undefined. With FormData object, the browser still appends a placeholder File object with a size of 0 and a generic type.
        .transform((file) => {
            if (file instanceof File && file.size === 0) {
                return undefined;
            }
            return file;
        })
        .optional()
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    role: z.uuid({ error: "required" })
});

export async function upsertBasicInfo(id: string | null, prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = FormSchema.safeParse({
        fullname: formData.get('fullname'),
        bio: formData.get('bio'),
        image: formData.get('image'),
        role: formData.get('role')
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check the fields.',
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                fullname: formData.get('fullname'),
                bio: formData.get('bio'),
            }
        };
    }

    const { fullname, bio, image, role } = validatedFields.data;
    let filename = null
    let profile_image_url = null

    if (image) {
        // upload image to blob store and get url.
        filename = slugify(fullname) + "." + image.name.split(".").pop(); // filename + extension
        try {
            const { url } = await put(`profile-images/${filename}`, image, { access: "public", addRandomSuffix: true })
            profile_image_url = url
        } catch (error) {
            console.log(error)
        }
    }

    if (id === null) {
        // insert
        let newItemId
        try {
            const supabase = await createClient()
            const { error, data } = await supabase.from("talents").insert({ fullname, bio, profile_image_url, role_id: role }).select("id").single()
            if (error) throw error
            newItemId = data.id;
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: 'A database error occurred. Please try again.',
            };
        }

        revalidatePath("/admin/collections/talents");
        redirect(`/admin/collections/talents/${newItemId}`)
    } else {
        // update
        const updatePayload: { fullname: string, bio: string, profile_image_url?: string, role_id: string } = { fullname, bio, role_id: role }
        if (profile_image_url) { updatePayload.profile_image_url = profile_image_url }
        try {
            const supabase = await createClient()
            const { error } = await supabase.from("talents").update(updatePayload).eq('id', id)
            if (error) throw error

            revalidatePath("/admin/collections/talents");
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
}