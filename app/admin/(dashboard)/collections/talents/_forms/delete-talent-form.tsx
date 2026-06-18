
"use client"
import { Button, Dialog, Form } from "@base-ui/react";
import clsx from "clsx";
import { Trash2Icon, XIcon } from "lucide-react";
import { ReactNode, useActionState } from "react";
import deleteTalent from "../_actions/delete-talent-action";
import { FormState } from "@/app/lib/definitions";

const initialState: FormState = {
    success: false,
    message: '',
};

export function DeleteTalentFormDialog({ id, name, children }: { id: string, name: string, children: ReactNode }) {
    const deleteLocationWithId = deleteTalent.bind(null, id)
    const [state, formAction, isPending] = useActionState(deleteLocationWithId, initialState);

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal className="text-black">
                <Dialog.Backdrop className="fixed inset-0 min-h-dvh backdrop-blur-[2px] " />
                <Dialog.Viewport>
                    <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 flex flex-col gap-4 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 shadow bg-white border border-gray-300 p-4 rounded-xl transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.9] data-starting-style:opacity-0">
                        <div className='flex justify-between items-center'>
                            <Dialog.Title className="font-semibold">{isPending ? "Deleting" : "Delete"} {name}{isPending ? "..." : ""}</Dialog.Title>
                            <Dialog.Close className="text-black" ><XIcon /></Dialog.Close>
                        </div>
                        {(!isPending && !state.success) && <Dialog.Description className="text-sm text-gray-500">
                            This action will permanently remove this talent and their related data. This action cannot be undone! <br />
                            Are you sure you want to continue?
                        </Dialog.Description>}
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
                                className="rounded-xl border ml-auto border-red-300 text-red-400 text-sm px-3 h-8 flex gap-1 hover:bg-red-200/50 shadow-sm cursor-pointer transition items-center data-disabled:text-gray-300 data-disabled:cursor-progress"
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