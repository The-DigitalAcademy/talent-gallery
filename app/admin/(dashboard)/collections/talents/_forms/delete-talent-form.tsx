
"use client"
import { Button, Dialog } from "@base-ui/react";
import { XIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import deleteTalent from "../_actions/delete-talent-action";
import { cn } from "@/app/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeleteTalentFormDialog({ id, name, children }: { id: string, name: string, children: ReactNode }) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter()

    async function onDelete() {
        setIsPending(true)
        const result = await deleteTalent(id)

        if (result.success == true) {
            toast.success("Talent deleted")
            router.push("/admin/collections/talents");
        } else
            toast.error(result.message || "failed to delete project")

        setIsPending(false)
    }

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
                            <Dialog.Title className="font-semibold">Delete {name}</Dialog.Title>
                            <Dialog.Close className="text-black" ><XIcon /></Dialog.Close>
                        </div>
                        <Dialog.Description className="text-sm text-gray-500">
                            This action will permanently remove this talent and their related data. This action cannot be undone! <br />
                            Are you sure you want to continue?
                        </Dialog.Description>
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