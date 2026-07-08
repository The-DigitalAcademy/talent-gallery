"use client"
import { FormState, WorkExperience } from "@/app/lib/definitions"
import { Button, Dialog, Field, Form } from "@base-ui/react"
import { CheckIcon, XIcon } from "lucide-react"
import { deleteWorkExperience, insertWorkExperience } from "../_actions/work-experience-action";
import { useActionState, useState, useEffect, useRef } from "react";
import { calculateDuration } from "@/app/lib/utils";
import clsx from "clsx";

const initialState: FormState = {
    success: false,
    message: '',
};

export default function WorkExperienceForm({ workExperiences, talentId }: { workExperiences: WorkExperience[], talentId: string }) {
    const createWorkExperience = insertWorkExperience.bind(null, talentId)
    const [state, formAction, isPending] = useActionState(createWorkExperience, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    // Controlled date/checkbox states for duration calculations
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isCurrent, setIsCurrent] = useState(false);

    // Calculate computed duration dynamically on the client
    const computedDuration = calculateDuration(startDate, endDate, isCurrent);

    // Reset date states and form inputs on successful submit, or sync states on error
    useEffect(() => {
        if (state.success) {
            setStartDate("");
            setEndDate("");
            setIsCurrent(false);
            formRef.current?.reset();
        } else if (state?.fields) {
            setStartDate(state.fields.start_date || "");
            setEndDate(state.fields.end_date || "");
            setIsCurrent(state.fields.is_current || false);
        }
    }, [state]);

    return (
        <div>
            <h2 className="mb-2 font-semibold">Work Experience</h2>
            <div className="w-full border border-gray-200 p-6 bg-white rounded-lg">
                <div className="grid grid-cols-3 gap-7">
                    <Form
                        ref={formRef}
                        action={formAction}
                        errors={state.errors}
                        className="flex flex-col gap-2 border border-gray-200 p-3 rounded-lg">
                        <Field.Root name="company" className="flex flex-col items-start gap-2 w-full">
                            <Field.Control
                                type="text"
                                name="company"
                                required
                                defaultValue={state?.fields?.company}
                                placeholder="Company"
                                className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                            />
                            <Field.Error className="text-xs text-red-700" />
                        </Field.Root>
                        <Field.Root name="role" className="flex flex-col items-start gap-2 w-full">
                            <Field.Control
                                type="text"
                                name="role"
                                required
                                defaultValue={state?.fields?.role}
                                placeholder="Role"
                                className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                            />
                            <Field.Error className="text-xs text-red-700" />
                        </Field.Root>
                        
                        <Field.Root name="duration" className="flex flex-col items-start gap-2 w-full">
                            <Field.Control
                                type="hidden"
                                name="duration"
                                value={computedDuration}
                            />
                            <div className="w-full space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-normal text-gray-700">Start date</label>
                                        <input
                                            type="month"
                                            name="start_date"
                                            required
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            max={isCurrent ? undefined : endDate}
                                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm font-normal"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-normal text-gray-700">End date</label>
                                        <input
                                            type="month"
                                            name="end_date"
                                            required={!isCurrent}
                                            disabled={isCurrent}
                                            value={isCurrent ? "" : endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            min={startDate}
                                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm font-normal disabled:bg-gray-100 disabled:text-gray-400"
                                        />
                                    </div>
                                </div>
                                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer mt-1 font-normal">
                                    <input
                                        type="checkbox"
                                        name="is_current"
                                        checked={isCurrent}
                                        onChange={(e) => setIsCurrent(e.target.checked)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>I currently work here (Ongoing)</span>
                                </label>
                                {computedDuration && (
                                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                                        Duration Preview: <span className="font-semibold text-gray-700">{computedDuration}</span>
                                    </div>
                                )}
                            </div>
                            <Field.Error className="text-xs text-red-700" />
                        </Field.Root>

                        <Field.Root name="description" className="flex flex-col items-start gap-2 w-full">
                            <textarea
                                name="description"
                                rows={3}
                                required
                                defaultValue={state?.fields?.description}
                                placeholder="Description"
                                className="border p-2 h-full text-sm w-full rounded-lg outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                            />
                            <Field.Error className="text-xs text-red-700" />
                        </Field.Root>
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
                                    "Add"
                                }

                            </Button>
                        </div>
                    </Form>
                    <div className="flex flex-col gap-3 col-span-2 overflow-y-scroll max-h-65 pr-5">
                        {!workExperiences.length && <div className="w-full text-sm text-gray-400 h-full flex items-center justify-center">No Work Experience</div>}
                        {workExperiences?.map(work => (
                            <div key={work.id} className="border border-gray-200 rounded-lg p-3 relative">
                                <div className="absolute right-2 top-1"><DeleteFormDialog item={{ id: work.id, name: work.role, talentId: work.talent_id }} /></div>
                                <div className="text-sm text-gray-700 break-words">{work.company}</div>
                                <div className="font-semibold text-base break-words">{work.role}</div>
                                <div className="flex gap-5 text-xs text-gray-500 break-words">{work.duration}</div>
                                <div className="text-sm text-gray-500 break-words">{work.description}</div>
                            </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function DeleteFormDialog({ item }: { item: { id: string, name: string, talentId: string } }) {
    const deleteWorkExperienceWithId = deleteWorkExperience.bind(null, item.id, item.talentId)
    const [state, formAction, isPending] = useActionState(deleteWorkExperienceWithId, initialState);

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <XIcon className='size-4 hover:text-red-500' />
            </Dialog.Trigger>
            <Dialog.Portal className="text-black">
                <Dialog.Backdrop className="fixed inset-0 min-h-dvh backdrop-blur-[2px] " />
                <Dialog.Viewport>
                    <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 flex flex-col gap-4 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 shadow bg-white border border-gray-300 p-4 rounded-xl transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.9] data-starting-style:opacity-0">
                        <div className='flex justify-between items-center'>
                            <Dialog.Title className="font-semibold">{isPending ? "Deleting" : "Delete"} {item.name}{isPending ? "..." : ""}</Dialog.Title>
                            <Dialog.Close className="text-black" ><XIcon /></Dialog.Close>
                        </div>
                        {(!isPending && !state.success) && <Dialog.Description className="text-sm text-gray-500">This action cannot be undone</Dialog.Description>}
                        <Form
                            action={formAction}
                            className="flex w-full flex-col gap-4"
                        >
                            {state.message && (
                                <div className={clsx({ "text-red-700": !state.success, "text-green-700": state.success }, "text-sm")}>
                                    {state.message}
                                </div>
                            )}
                            {!state.success && <Button
                                disabled={isPending}
                                focusableWhenDisabled
                                type="submit"
                                className="rounded-xl border ml-auto border-red-300 text-red-400 text-sm px-3 h-8 flex gap-1 hover:bg-red-200/50 shadow-sm cursor-pointer transition items-center data-disabled:text-gray-300 data-disabled:cursor-default"
                            >
                                Delete
                            </Button>}
                        </Form>
                    </Dialog.Popup>
                </Dialog.Viewport>
            </Dialog.Portal>
        </Dialog.Root>
    );
}