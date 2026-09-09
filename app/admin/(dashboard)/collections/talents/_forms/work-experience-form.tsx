"use client"
import { WorkExperience } from "@/app/lib/definitions"
import { Button, Dialog, Field, Form } from "@base-ui/react"
import { XIcon } from "lucide-react"
import { deleteWorkExperience, insertWorkExperience } from "../_actions/work-experience-action";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import { toast } from "sonner";

type FormValues = {
    company: string,
    role: string,
    startDate: Date,
    endDate: Date,
    description?: string | null
    isCurrent: boolean
}

export default function WorkExperienceForm({ workExperiences, talentId }: { workExperiences: WorkExperience[], talentId: string }) {
    const { handleSubmit, register, reset, setError, watch, formState: { errors, isSubmitting, isValid } } = useForm<FormValues>({ defaultValues: { isCurrent: false } })

    const [isCurrent, startDate] = watch(["isCurrent", "startDate"])

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const { company, role, description, startDate, endDate, isCurrent } = data

        // DURATION VALUE
        const finalEndDate = isCurrent ? new Date() : endDate
        const totalMonths = moment(finalEndDate).diff(moment(startDate), "months")
        let totalDurationsText = `${totalMonths} months`
        if (totalMonths > 11) {
            const years = Math.floor(totalMonths / 12);
            const months = totalMonths % 12;

            // Handle pluralization
            const yearStr = years === 1 ? 'year' : 'years';
            const monthStr = months === 1 ? 'month' : 'months';

            // If remaining months is 0, you can choose to omit it or keep it
            totalDurationsText = months > 0
                ? `${years} ${yearStr} ${months} ${monthStr}`
                : `${years} ${yearStr}`;
        }
        const duration = `${moment(startDate).format('MMM YYYY')} - ${moment(finalEndDate).format('MMM YYYY')} (${totalDurationsText})`

        const result = await insertWorkExperience(talentId, { company, duration, role, description })

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

        if (result.success) reset()
    }

    return (
        <div>
            <h2 className="mb-2 font-semibold">Work Experience</h2>
            <div className="w-full border border-gray-200 p-6 bg-white rounded-lg">
                <div className="grid grid-cols-3 gap-7">
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-2 border border-gray-200 p-3 rounded-lg">
                        <Field.Root name="company" className="flex flex-col items-start gap-2 w-full">
                            <Field.Control
                                {...register("company", { required: true, minLength: 2, maxLength: 50 })}
                                placeholder="Company"
                                className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                            />
                            <p className="text-xs text-red-700 block">{errors.company?.message}</p>
                        </Field.Root>
                        <Field.Root name="role" className="flex flex-col items-start gap-2 w-full">
                            <Field.Control
                                {...register("role", { required: true, minLength: 2, maxLength: 50 })}
                                placeholder="Role"
                                className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                            />
                            <Field.Error className="text-xs text-red-700" />
                        </Field.Root>

                        <Field.Root name="duration" className="flex flex-col items-start gap-2 w-full">
                            <div className="w-full space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <Field.Root name="startDate" className="flex flex-col gap-1">
                                        <Field.Label className="text-sm font-normal text-gray-700">Start date</Field.Label>
                                        <input
                                            type="month"
                                            {...register("startDate", { required: true, valueAsDate: true })}
                                            max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`}
                                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm font-normal"
                                        />
                                    </Field.Root>
                                    <Field.Root name="endDate" className="flex flex-col gap-1">
                                        <Field.Label className="text-sm font-normal text-gray-700">End date</Field.Label>
                                        <input
                                            type="month"
                                            {...register("endDate", { required: !isCurrent, valueAsDate: true })}
                                            disabled={isCurrent}
                                            min={`${startDate?.getFullYear()}-${String(startDate?.getMonth() + 1).padStart(2, '0')}`}
                                            max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`}
                                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm font-normal disabled:bg-gray-100 disabled:text-gray-400"
                                        />
                                    </Field.Root>
                                </div>
                                <Field.Root>
                                    <Field.Label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer mt-1 font-normal">
                                        <input
                                            type="checkbox"
                                            {...register("isCurrent")}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span>I currently work here (Ongoing)</span>
                                    </Field.Label>
                                </Field.Root>
                            </div>
                            <Field.Error className="text-xs text-red-700" />
                        </Field.Root>

                        <Field.Root name="description" className="flex flex-col items-start gap-2 w-full">
                            <textarea
                                {...register("description", { minLength: 2, maxLength: 2000 })}
                                rows={3}
                                placeholder="Description"
                                className="border p-2 h-full text-sm w-full rounded-lg outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                            />
                            <Field.Error className="text-xs text-red-700" />
                        </Field.Root>
                        <div className="flex justify-end items-center gap-4">
                            <div className="text-red-700/75 text-xs flex items-center gap-1">
                                {errors?.form?.message}
                            </div>
                            <Button
                                disabled={!isValid || isSubmitting}
                                focusableWhenDisabled
                                type="submit"
                                className={cn("bg-green-600 hover:bg-green-700 data-disabled:bg-green-600/50", "text-white rounded-lg justify-center  text-sm px-3 h-8 flex gap-1  cursor-pointer transition items-center data-disabled:cursor-default")}
                            >
                                {isSubmitting && <span className="w-4 h-4 border-3 border-white/75 rounded-full inline-block animate-spin border-b-white/25" ></span>}
                                <span>Add</span>
                            </Button>
                        </div>
                    </Form>
                    <div className="flex flex-col gap-3 col-span-2 overflow-y-scroll max-h-65 pr-5">
                        {!workExperiences.length && <div className="w-full text-sm text-gray-400 h-full flex items-center justify-center">No Work Experience</div>}
                        {workExperiences?.toReversed().map(work => (
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
    const [isPending, setIsPending] = useState(false);

    async function onDelete() {
        setIsPending(true)
        const result = await deleteWorkExperience(item.id, item.talentId)

        if (result.success == true)
            toast.success("Work experience deleted")
        else
            toast.error(result.message || "failed to delete project")

        setIsPending(false)
    }

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
                            <Dialog.Title className="font-semibold">Delete {item.name}</Dialog.Title>
                            <Dialog.Close className="text-black" ><XIcon /></Dialog.Close>
                        </div>
                        <Dialog.Description className="text-sm text-gray-500">This action cannot be undone</Dialog.Description>
                        <div className="flex w-full flex-col gap-4">
                            <Button
                                onClick={() => onDelete()}
                                disabled={isPending}
                                focusableWhenDisabled
                                type="submit"
                                className={cn("bg-red-500 hover:bg-red-600 data-disabled:bg-red-500/50", "text-white rounded-lg  ml-auto justify-center text-sm px-3 h-8 flex gap-1 cursor-pointer transition items-center data-disabled:cursor-default")}
                            >
                                {isPending && <span className="w-4 h-4 border-3 border-white/75 rounded-full inline-block animate-spin border-b-white/25" ></span>}
                                <span>Delete</span>
                            </Button>
                        </div>
                    </Dialog.Popup>
                </Dialog.Viewport>
            </Dialog.Portal>
        </Dialog.Root>
    );
}