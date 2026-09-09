"use client"
import { Endorsement } from "@/app/lib/definitions"
import { Button, Dialog, Field, Form } from "@base-ui/react"
import { XIcon } from "lucide-react"
import { useState } from "react";
import { deleteEndorsement, insertEndorsement } from "../_actions/endorsements-action";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/app/lib/utils";
import { toast } from "sonner";


type FormValues = {
    name: string,
    message: string
}

export default function EndorsementsForm({ endorsements, talentId }: { endorsements: Endorsement[], talentId: string }) {
    const { handleSubmit, register, reset, setError, formState: { errors, isSubmitting, isValid } } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const result = await insertEndorsement(talentId, data)

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
            <h2 className="mb-2 font-semibold">Endorsements</h2>
            <div className="w-full border border-gray-200 p-6 bg-white rounded-lg">
                <div className="grid grid-cols-3 gap-7">
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-2 border border-gray-200 p-3 rounded-lg">
                        <Field.Root name="name" className="flex flex-col items-start gap-2 w-full">
                            <Field.Control
                                {...register("name", { required: true, minLength: 2, maxLength: 50 })}
                                placeholder="Endorser name & title"
                                className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                            />
                            <p className="text-xs text-red-700 block">{errors.name?.message}</p>
                        </Field.Root>
                        <Field.Root name="message" className="flex flex-col items-start gap-2 w-full">
                            <textarea
                                {...register("message", { required: true, minLength: 2, maxLength: 2000 })}
                                rows={5}
                                placeholder="Message"
                                className="border p-2 h-full text-sm w-full rounded-lg outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                            />
                            <p className="text-xs text-red-700" >{errors.message?.message}</p>
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
                    <div className="flex flex-col gap-3 col-span-2 overflow-y-scroll max-h-55 pr-5">
                        {!endorsements.length && <div className="w-full text-sm text-gray-400 h-full flex items-center justify-center">No Endorsements</div>}
                        {endorsements?.toReversed().map(item => (
                            <blockquote key={item.id} className="border border-gray-200 rounded-lg p-3 relative">
                                <div className="absolute right-2 top-1"><DeleteFormDialog item={{ id: item.id, name: item.endorser_name, talentId: item.talent_id }} /></div>
                                <p className="text-sm italic text-gray-800 mb-2">"{item.message}"</p>
                                <p className="text-sm text-gray-500">{item.endorser_name}</p>
                            </blockquote>))}
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
        const result = await deleteEndorsement(item.id, item.talentId)

        if (result.success == true)
            toast.success("endorsement deleted")
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
                            <Dialog.Title className="font-semibold">Delete endorsement by {item.name}</Dialog.Title>
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