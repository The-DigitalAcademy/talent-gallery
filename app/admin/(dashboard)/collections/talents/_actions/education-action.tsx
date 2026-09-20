"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { FormState } from "@/app/lib/definitions";
import { requireAdmin } from "@/app/lib/auth/requireAdmin";
import { createClient } from "@/app/lib/supabase/server";

const EducationSchema = z.object({
  institution: z
    .string()
    .trim()
    .min(2, {
      message: "Institution must be at least 2 characters long.",
    })
    .max(50, {
      message: "Institution cannot exceed 50 characters.",
    }),

  qualification: z
    .string()
    .uuid({
      message: "Please select a valid qualification.",
    }),

  fieldOfStudy: z
    .string()
    .uuid({
      message: "Please select a valid field of study.",
    })
    .nullable()
    .optional(),

  duration: z
    .string()
    .trim()
    .min(2, {
      message: "Duration must be at least 2 characters long.",
    })
    .max(50, {
      message: "Duration cannot exceed 50 characters.",
    }),
});

type EducationSchemaType = z.infer<typeof EducationSchema>;

export async function insertEducation(
  talentId: string,
  data: EducationSchemaType,
): Promise<FormState> {
  await requireAdmin();

  const validatedFields = EducationSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check the fields.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    institution,
    qualification,
    fieldOfStudy,
    duration,
  } = validatedFields.data;

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("education")
      .insert({
        talent_id: talentId,
        institution,
        duration,
        qualification_id: qualification,
        field_of_study_id: fieldOfStudy,
      });

    if (error) {
      console.error("Failed to insert education:", error);
      throw error;
    }

    revalidatePath(
      `/admin/collections/talents/${talentId}`,
    );

    return {
      success: true,
      message: "Success! Education added.",
    };
  } catch (error) {
    console.error("insertEducation error:", error);

    return {
      success: false,
      message:
        "A database error occurred. Please try again.",
    };
  }
}

export async function deleteEducation(
  id: string,
  talentId: string,
) {
  await requireAdmin();

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("education")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete education:", error);
      throw error;
    }

    revalidatePath(
      `/admin/collections/talents/${talentId}`,
    );

    return {
      success: true,
      message: "Success! Education deleted.",
    };
  } catch (error) {
    console.error("deleteEducation error:", error);

    return {
      success: false,
      message:
        "A database error occurred. Please try again.",
    };
  }
}