"use client"
import { Button, Field, Form } from "@base-ui/react";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { upsertCapabilitiesSummary } from "../_actions/capabilities-summary-action";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/app/lib/utils";

type FormValues = { summary: string | null }

export default function CapabilitiesSummaryForm({ talentId, summary }: { talentId: string, summary?: string }) {
    const [showCheck, setShowCheck] = useState(false)
    const { handleSubmit, register, reset, setValue, setError, formState: { defaultValues, isDirty, dirtyFields, errors, isSubmitting } } = useForm<FormValues>({ defaultValues: { summary } })

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        // submit to backend
        const result = await upsertCapabilitiesSummary(talentId, data)

        // set errors from server
        if (result.success == false) {
            setError("root", { message: result.message })
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
            <h2 className="mb-2 font-semibold">Capabilities Summary</h2>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full border border-gray-200 p-6 bg-white rounded-lg"
            >
                <div className="flex flex-col gap-7 mb-5">
                    <Field.Root name="summary" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Summary of core capabilities
                        </Field.Label>
                        <textarea
                            rows={5}
                            {...register("summary")}
                            disabled={isSubmitting}
                            className={cn("border p-2 h-full text-sm w-full rounded-lg outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal", { "bg-yellow-50": dirtyFields.summary })}
                        />
                        <Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                </div>
                <div className="flex justify-end items-center gap-4">
                    <div className="text-red-700/75 text-xs flex items-center gap-1">
                        {errors?.root?.message}
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
        </div>)
}