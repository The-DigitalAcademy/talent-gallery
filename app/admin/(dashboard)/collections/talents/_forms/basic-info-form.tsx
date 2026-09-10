"use client"
import { Button, Field, Form } from "@base-ui/react";
import { CheckIcon, UploadCloudIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { upsertBasicInfo } from "../_actions/basic-info-action";
import FormSelect from "@/components/admin/form-select";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn, slugify } from "@/app/lib/utils";
import { toast } from "sonner";
import { createClient } from "@/app/lib/supabase/client";

type FormValues = {
    fullname?: string | null,
    bio?: string | null,
    profileImageUrl?: string | null,
    roleId: string | null
}

const supabase = createClient()

export default function BasicInfoForm({ talentId, values, roles }: { talentId?: string, values?: FormValues, roles: { id: string, name: string }[] }) {
    const [showCheck, setShowCheck] = useState(false)
    const { handleSubmit, register, reset, setValue, setError, formState: { defaultValues, isDirty, dirtyFields, errors, isSubmitting } } = useForm<FormValues>({ defaultValues: values })
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null | undefined>(defaultValues?.profileImageUrl)
    const [file, setFile] = useState<File | null>(null)

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const BUCKET_NAME = "profile-images"
        // upload file
        let newProfileImageUrl = null
        if (file) {
            const fileExtension = file.name.split('.').pop();
            const uuidSuffix = crypto.randomUUID().substring(0, 6)
            const filepath = `${slugify(data?.fullname ?? defaultValues?.fullname ?? "")}-${uuidSuffix}.${fileExtension}`;

            const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(filepath, file)
            if (uploadError) {
                toast.error("Couldn't upload image", { description: uploadError.message })
            } else {
                const { data: url } = await supabase.storage.from(BUCKET_NAME).getPublicUrl(filepath)
                newProfileImageUrl = url.publicUrl
            }
        }


        // get changed values only
        const dirtyValues = Object.fromEntries(
            Object.entries(dirtyFields)
                .filter(([_, value]) => value === true)
                .map(([key]) => [key, data[key as keyof FormValues]])
        )
        if (newProfileImageUrl !== null) {
            dirtyValues.profileImageUrl = newProfileImageUrl
        }
        // submit to backend
        const result = await upsertBasicInfo(talentId ? talentId : null, dirtyValues)
        // set errors from server
        if (result.success == false) {
            setError("form", { message: result.message })
            if (result.errors) {
                for (const key in result.errors) {
                    const errKey = key as keyof FormValues
                    setError(errKey, { message: result?.errors[errKey]?.toString() })
                }
            }
        }

        // reset default values
        if (result.success) {
            setShowCheck(true)
            if (result.data) reset(result.data)
            if (result.data?.profileImageUrl) setImagePreviewUrl(result.data.profileImageUrl)
        }
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setFile(file)
            const objectUrl = URL.createObjectURL(file);
            setImagePreviewUrl(objectUrl);
        }
    }

    useEffect(() => {
        if (showCheck) {
            const timer = setTimeout(() => setShowCheck(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [showCheck])

    return (
        <div>
            <h2 className="mb-2 font-semibold">Basic Profile</h2>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full border border-gray-200 p-6 bg-white rounded-lg"
            >
                <div className="grid grid-cols-2 gap-7 mb-5">
                    <div className="flex flex-col gap-7">
                        <Field.Root name="fullname" className="flex flex-col items-start gap-2 w-full">
                            <Field.Label className="text-xs text-gray-700">
                                Full Name
                            </Field.Label>
                            <Field.Control
                                type="text"
                                required
                                {...register("fullname")}
                                placeholder="Jacob Mabena"
                                className={cn(
                                    "border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal",
                                    { "border-blue-500 focus:border-blue-500": dirtyFields.fullname }
                                )}
                            />
                            <Field.Error className="text-xs text-red-700" >{errors?.fullname?.message}</Field.Error>
                        </Field.Root>
                        <Field.Root name="bio" className="flex flex-col items-start gap-2 w-full">
                            <Field.Label className="text-xs text-gray-700">
                                Bio
                            </Field.Label>
                            <textarea
                                {...register("bio")}
                                rows={4}
                                placeholder="A little something about the talent"
                                className={cn(
                                    "border p-2 h-full text-sm w-full rounded-lg outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal",
                                    { "border-blue-500 focus:border-blue-500": dirtyFields.bio })}
                            />
                            <Field.Error className="text-xs text-red-700" >{errors.bio?.message}</Field.Error>
                        </Field.Root>
                        <Field.Root name="role" className={cn("flex flex-col items-start gap-2 w-full", { "[&>button]:border-blue-500 [&>button]:focus:border-blue-500": dirtyFields.roleId })} >
                            <Field.Label className="text-xs text-gray-700" >
                                Role
                            </Field.Label>
                            < FormSelect
                                defaultValue={defaultValues?.roleId}
                                onValueChange={(val) => setValue("roleId", val, { shouldDirty: true })}
                                placeholder="Select role"
                                options={roles?.map(i => ({ label: i.name, value: i.id })) || []} />
                            <Field.Error className="text-xs text-red-700" >{errors.roleId?.message}</Field.Error>
                        </Field.Root>
                    </div>
                    <Field.Root name="image" className="flex flex-col items-start gap-2 mx-auto">
                        <Field.Label className="text-xs text-gray-700 cursor-pointer">
                            <div className="mb-2">Profile Image</div>
                            <div className="">
                                {imagePreviewUrl ?
                                    <div className={cn("relative size-45 overflow-hidden border rounded-lg border-dashed border-gray-300", { "border-blue-500": defaultValues?.profileImageUrl !== imagePreviewUrl })}>
                                        <img className="object-cover object-center h-full w-full" src={imagePreviewUrl} />
                                        <div className="absolute bg-white/10 hover:bg-white/50 hover:text-gray-600 text-transparent inset-0 flex flex size-45  flex-col items-center justify-center">
                                            <UploadCloudIcon />
                                            <div>Click to upload</div>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex size-45 flex-col overflow-hidden border rounded-lg border-dashed border-gray-300 items-center gap-1 justify-center bg-gray-50 hover:bg-gray-100">
                                        <UploadCloudIcon />
                                        <div>Click to upload</div>
                                    </div>}
                            </div>
                        </Field.Label>
                        <Field.Control
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(event) => handleFileChange(event)}
                            className="border active:border-gray-600 focus:border-gray-600 border-gray-300 rounded-lg w-full text-sm text-slate-500 h-8 file:h-full file:px-4 file:mr-2 file:text-sm file:border-r file:border-gray-300 file:bg-gray-50 hover:file:bg-gray-100"
                        />
                        <Field.Error className="text-xs text-red-700" >{errors.profileImageUrl?.message}</Field.Error>
                    </Field.Root>
                </div >
                <div className="flex justify-end items-center gap-4">
                    <div className="text-red-700/75 text-xs flex items-center gap-1">
                        {errors?.form?.message}
                    </div>
                    <Button
                        disabled={(!isDirty || isSubmitting) && defaultValues?.profileImageUrl == imagePreviewUrl}
                        focusableWhenDisabled
                        type="submit"
                        className={cn("bg-green-600 hover:bg-green-700 data-disabled:bg-green-600/50", "text-white rounded-lg justify-center  text-sm px-3 h-8 flex gap-1  cursor-pointer transition items-center data-disabled:cursor-default")}
                    >
                        {isSubmitting && <span className="w-4 h-4 border-3 border-white/75 rounded-full inline-block animate-spin border-b-white/25" ></span>}
                        {(showCheck && !isSubmitting && !isDirty) && <CheckIcon className="w-4" />}
                        <span>Save</span>
                    </Button>
                </div>
            </Form>
        </div>)
}