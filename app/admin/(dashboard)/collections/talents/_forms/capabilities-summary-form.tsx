"use client"
import { Button, Field, Form } from "@base-ui/react";
import { CheckIcon, XIcon } from "lucide-react";
import { useActionState } from "react";
import { FormState } from "@/app/lib/definitions";
import { updateCapabilitiesSummary } from "../_actions/capabilities-summary-action";

const initialState: FormState = {
    success: false,
    message: '',
};

export default function CapabilitiesSummaryForm({ values }: { values: { id: string, summary?: string } }) {
    const updateSummary = updateCapabilitiesSummary.bind(null, values.id)
    const [state, formAction, isPending] = useActionState(updateSummary, initialState);

    return (
        <div>
            <h2 className="mb-2 font-semibold">Capabilities Summary</h2>
            <Form
                className="w-full border border-gray-200 p-6 bg-white rounded-lg"
                action={formAction}
                errors={state.errors}
            >
                <div className="flex flex-col gap-7 mb-5">
                    <Field.Root name="summary" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Summary of core capabilities
                        </Field.Label>
                        <textarea
                            name="summary"
                            rows={5}
                            disabled={isPending}
                            defaultValue={values?.summary || state?.fields?.summary}
                            placeholder=""
                            className="border p-2 h-full text-sm w-full rounded-lg outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                        />
                        <Field.Error className="text-xs text-red-700" />
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