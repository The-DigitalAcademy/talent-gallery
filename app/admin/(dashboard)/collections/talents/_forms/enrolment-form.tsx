"use client"
import { Cohort, FormState, Location, Program, TalentStatus } from "@/app/lib/definitions"
import FormSelect from "@/components/admin/form-select"
import { Button, Field, Form } from "@base-ui/react"
import { upsertEnrolmentInfo } from "../_actions/enrolment-action";
import { useActionState } from "react";
import clsx from "clsx";
import { CheckIcon, XIcon } from "lucide-react";

const initialState: FormState = {
    success: false,
    message: '',
};

type Props = {
    data: {
        cohorts: Cohort[],
        locations: Location[],
        programs: Program[],
        statuses: TalentStatus[]
    }
    values: {
        id: string
        program?: string,
        cohort?: string,
        status?: string,
        location?: string
    }
}

export default function EnrolmentForm({ values, data }: Props) {
    const createEnrolmentInfo = upsertEnrolmentInfo.bind(null, values.id)
    const [state, formAction, isPending] = useActionState(createEnrolmentInfo, initialState);

    return (
        <div>
            <h2 className="mb-2 font-semibold">Enrolment</h2>
            <Form
                className="w-full border border-gray-200 p-6 bg-white rounded-lg"
                action={formAction}
                errors={state.errors}
            >
                <div className="grid grid-cols-2 gap-7 mb-5" >
                    <Field.Root name="location" className="flex flex-col items-start gap-2 w-full" >
                        <Field.Label className="text-xs text-gray-700" >
                            Location
                        </Field.Label>
                        < FormSelect
                            defaultValue={values?.location}
                            placeholder="Select location"
                            options={data.locations?.map(i => ({ label: `${i.city}, ${i.country}`, value: i.id })) || []
                            } />
                        < Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                    < Field.Root name="program" className="flex flex-col items-start gap-2 w-full" >
                        <Field.Label className="text-xs text-gray-700" >
                            Program
                        </Field.Label>
                        < FormSelect
                            defaultValue={values?.program}
                            placeholder="Select program"
                            options={data.programs?.map(i => ({ label: i.name, value: i.id })) || []} />
                        < Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                    < Field.Root name="cohort" className="flex flex-col items-start gap-2 w-full" >
                        <Field.Label className="text-xs text-gray-700" >
                            Cohort
                        </Field.Label>
                        < FormSelect
                            defaultValue={values?.cohort}
                            placeholder="Select cohort"
                            options={data.cohorts?.map(i => ({ label: i.name, value: i.id })) || []} />
                        < Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                    < Field.Root name="status" className="flex flex-col items-start gap-2 w-full" >
                        <Field.Label className="text-xs text-gray-700" >
                            Status
                        </Field.Label>
                        < FormSelect
                            defaultValue={values?.status}
                            placeholder="Select status"
                            options={data.statuses?.map(i => ({ label: i.name, value: i.id })) || []} />
                        < Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                </div>
                <div className="flex justify-end items-center gap-4">
                    {(!isPending && state.success) &&
                        <div className="text-green-700/75 text-xs flex items-center gap-1">
                            <CheckIcon className="w-4" />Saved
                        </div>
                    }
                    {(!isPending && !state.success && state.message) && (
                        <div className="text-red-700/75 text-xs flex items-center gap-1">
                            <XIcon className="w-4" />{state.message}
                        </div>
                    )}
                    <Button
                        disabled={isPending}
                        focusableWhenDisabled
                        type="submit"
                        className="rounded-xl justify-center border border-gray-300 text-sm px-3 h-8 flex gap-1 hover:bg-gray-100 shadow-sm cursor-pointer transition items-center data-disabled:animate-pulse data-disabled:cursor-default"
                    >
                        {isPending ?
                            <span className="w-4 h-4 border-3 border-gray-600 rounded-full inline-block animate-spin border-b-gray-100" ></span>
                            :
                            "Save Changes"
                        }

                    </Button>
                </div>
            </Form>
        </div>)
}