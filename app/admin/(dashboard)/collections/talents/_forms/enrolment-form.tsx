"use client"
import { Cohort, Location, Program, TalentStatus } from "@/app/lib/definitions"
import FormSelect from "@/components/admin/form-select"
import { Button, Field, Form } from "@base-ui/react"
import { upsertEnrolmentInfo } from "../_actions/enrolment-action";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/app/lib/utils";

type Props = {
    data: {
        cohorts: Cohort[],
        locations: Location[],
        programs: Program[],
        statuses: TalentStatus[]
    },
    values: FormValues,
    talentId: string
}

type FormValues = {
    program?: string | null,
    cohort?: string | null,
    status?: string | null,
    location?: string | null
}

export default function EnrolmentForm({ values, data, talentId }: Props) {
    const { handleSubmit, reset, setValue, setError, formState: { defaultValues, isDirty, dirtyFields, errors, isSubmitting } } = useForm<FormValues>({ defaultValues: values })

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        // get changed values only
        const dirtyValues = Object.fromEntries(
            Object.entries(dirtyFields)
                .filter(([_, value]) => value === true)
                .map(([key]) => [key, data[key as keyof FormValues]])
        )
        // submit to backend
        const result = await upsertEnrolmentInfo(talentId, dirtyValues)

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

        if (result.success) reset(result.data)
    }

    return (
        <div>
            <h2 className="mb-2 font-semibold">Enrolment</h2>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full border border-gray-200 p-6 bg-white rounded-lg"
            >
                <div className="grid grid-cols-2 gap-7 mb-5" >
                    <Field.Root name="location" className={cn("flex flex-col items-start gap-2 w-full", { "[&>button]:border-blue-500 [&>button]:focus:border-blue-500": dirtyFields.location })} >
                        <Field.Label className="text-xs text-gray-700" >
                            Location
                        </Field.Label>
                        < FormSelect
                            onValueChange={(val) => setValue("location", val, { shouldDirty: true })}
                            defaultValue={defaultValues?.location}
                            placeholder="Select location"
                            options={data.locations?.map(i => ({ label: `${i.city}, ${i.country}`, value: i.id })) || []
                            } />
                        <div className="text-xs text-red-700">{errors.location?.message}</div>
                    </Field.Root>
                    < Field.Root name="program" className={cn("flex flex-col items-start gap-2 w-full", { "[&>button]:border-blue-500 [&>button]:focus:border-blue-500": dirtyFields.program })} >
                        <Field.Label className="text-xs text-gray-700" >
                            Program
                        </Field.Label>
                        < FormSelect
                            onValueChange={(val) => setValue("program", val, { shouldDirty: true })}
                            defaultValue={defaultValues?.program}
                            placeholder="Select program"
                            options={data.programs?.map(i => ({ label: i.name, value: i.id })) || []} />
                        <Field.Error className="text-xs text-red-700">{errors.program?.message}</Field.Error>
                    </Field.Root>
                    < Field.Root name="cohort" className={cn("flex flex-col items-start gap-2 w-full", { "[&>button]:border-blue-500 [&>button]:focus:border-blue-500": dirtyFields.cohort })} >
                        <Field.Label className="text-xs text-gray-700" >
                            Cohort
                        </Field.Label>
                        < FormSelect
                            onValueChange={(val) => setValue("cohort", val, { shouldDirty: true })}
                            defaultValue={defaultValues?.cohort}
                            placeholder="Select cohort"
                            options={data.cohorts?.map(i => ({ label: i.name, value: i.id })) || []} />
                        < Field.Error className="text-xs text-red-700" >{errors.cohort?.message}</Field.Error>
                    </Field.Root>
                    < Field.Root name="status" className={cn("flex flex-col items-start gap-2 w-full", { "[&>button]:border-blue-500 [&>button]:focus:border-blue-500": dirtyFields.status })} >
                        <Field.Label className="text-xs text-gray-700" >
                            Status
                        </Field.Label>
                        < FormSelect
                            onValueChange={(val) => setValue("status", val, { shouldDirty: true })}
                            defaultValue={defaultValues?.status}
                            placeholder="Select status"
                            options={data.statuses?.map(i => ({ label: i.name, value: i.id })) || []} />
                        < Field.Error className="text-xs text-red-700" >{errors.status?.message}</Field.Error>
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
                        <span>Save</span>
                    </Button>
                </div>
            </Form>
        </div>)
}