import { AlertDialog } from "@base-ui/react";
import { SquarePenIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export default function CollectionItemActions({ id, itemName, collectionSlug }: { id: string, itemName: string, collectionSlug: string }) {
    return (
        <div className='flex gap-4 justify-end'>
            <Link href={`/admin/collections/${collectionSlug}/${id}/edit`}><SquarePenIcon className='size-5' /></Link>
            <AlertDialog.Root>
                <AlertDialog.Trigger><Trash2Icon className='size-5' /></AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-50 supports-[-webkit-touch-callout:none]:absolute" />
                    <AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 flex w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 bg-white dark:bg-neutral-950 p-4 text-neutral-950 dark:text-white border border-neutral-950 dark:border-white transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
                        <div className="flex flex-col gap-1">
                            <AlertDialog.Title className="text-base font-bold">Delete {itemName}?</AlertDialog.Title>
                            <AlertDialog.Description className="text-sm text-neutral-600 dark:text-neutral-400">
                                You can’t undo this action.
                            </AlertDialog.Description>
                        </div>
                        <div className="flex justify-end gap-3">
                            <AlertDialog.Close className="flex items-center text-center border bg-white px-3 py-1.5 text-sm cursor-pointer hover:bg-neutral-100 active:bg-slate-200">Cancel</AlertDialog.Close>
                            <AlertDialog.Close className="text-red-600 flex items-center text-center border border-red-600 bg-white px-3 py-1.5 text-sm cursor-pointer hover:bg-red-50 active:bg-slate-200">Delete</AlertDialog.Close>
                        </div>
                    </AlertDialog.Popup>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
    )
}