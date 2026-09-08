"use client"
import { Button, Field, Form } from "@base-ui/react";
import { useEffect, useState } from "react";
import { upsertUrls } from "../_actions/urls-action";
import LinkPreviewCard from "@/components/admin/link-preview-card";
import { CheckIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/app/lib/utils";

type Props = {
    talentId: string,
    values: FormValues
}

type FormValues = {
    youtube?: string | null,
    portfolio?: string | null,
    linkedin?: string | null,
    github?: string | null
}

export default function URLsForm({ talentId, values }: Props) {
    const [showCheck, setShowCheck] = useState(false)
    const { handleSubmit, watch, reset, register, setValue, setError, formState: { defaultValues, isDirty, dirtyFields, errors, isSubmitting } } = useForm<FormValues>({ defaultValues: values })

    const [githubLink, linkedinLink, portfolioLink, youtubeLink] = watch(["github", "linkedin", "portfolio", "youtube"])


    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        // get changed values only
        const dirtyValues = Object.fromEntries(
            Object.entries(dirtyFields)
                .filter(([_, value]) => value === true)
                .map(([key]) => [key, data[key as keyof FormValues]])
        )
        // submit to backend
        const result = await upsertUrls(talentId, dirtyValues)

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
            <h2 className="mb-2 font-semibold">Profile Links</h2>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full border border-gray-200 p-6 bg-white rounded-lg"
            >
                <div className="grid grid-cols-2 gap-7 mb-5">
                    <Field.Root name="youtube" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Youtube URL
                        </Field.Label>
                        <Field.Control
                            type="url"
                            {...register("youtube")}
                            placeholder="http://youtube.com"
                            className={cn(
                                "border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal",
                                { "border-blue-500 focus:border-blue-500": dirtyFields.youtube })}
                        />
                        <Field.Error className="text-xs text-red-700" />
                        <LinkPreviewCard targetUrl={youtubeLink} />
                    </Field.Root>
                    <Field.Root name="portfolio" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Portfolio URL
                        </Field.Label>
                        <Field.Control
                            type="url"
                            {...register("portfolio")}
                            placeholder="http://myportfolio.com"
                            className={cn(
                                "border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal",
                                { "border-blue-500 focus:border-blue-500": dirtyFields.portfolio })
                            }
                        />
                        <Field.Error className="text-xs text-red-700" />
                        <LinkPreviewCard targetUrl={portfolioLink} />
                    </Field.Root>
                    <Field.Root name="linkedin" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            LinkedIn URL
                        </Field.Label>
                        <Field.Control
                            type="url"
                            {...register("linkedin")}
                            placeholder="https://www.linkedin.com/in/john-doe"
                            className={cn(
                                "border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal",
                                { "border-blue-500 focus:border-blue-500": dirtyFields.linkedin })
                            }
                        />
                        <Field.Error className="text-xs text-red-700" />
                        <LinkPreviewCard targetUrl={linkedinLink} />
                    </Field.Root>
                    <Field.Root name="github" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            GitHub URL
                        </Field.Label>
                        <Field.Control
                            type="url"
                            {...register("github")}
                            placeholder="https://www.github.com/in/john-doe"
                            className={cn(
                                "border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal",
                                { "border-blue-500 focus:border-blue-500": dirtyFields.github })
                            }
                        />
                        <Field.Error className="text-xs text-red-700" />
                        <LinkPreviewCard targetUrl={githubLink} />
                    </Field.Root>
                </div>
                <div className="flex justify-end items-center gap-4">
                    <div className="text-red-700/75 text-xs flex items-center gap-1">
                        {errors?.form?.message}
                    </div>
                    <Button
                        disabled={!isDirty || isSubmitting}
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
        </div>
    )
}