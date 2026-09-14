"use client"
import { Button, Switch } from "@base-ui/react"
import { useState } from "react";
import { updateIsPublished } from "../_actions/published-status-action";
import clsx from "clsx";
import { toast } from "sonner";

export function PublishedStatusForm({ isPublished, talentId }: { isPublished: boolean, talentId: string }) {
    const [isPending, setIsPending] = useState(false);

    async function handleClick() {
        setIsPending(true)
        const result = await updateIsPublished(talentId, !isPublished)

        if (result.success == true) {
            toast.success("Talent " + (!isPublished ? "Published" : "Unpublished"))
        } else
            toast.error(result.message || "failed update plublish status")

        setIsPending(false)
    }

    return (
        <div className="h-fit">
            <div className="flex justify-end items-center gap-4">
                <Button
                    onClick={() => handleClick()}
                    disabled={isPending}
                    focusableWhenDisabled
                    type="submit"
                    className={clsx("rounded-lg justify-center text-sm px-5 h-8 flex gap-1 text-white font-semibold cursor-pointer transition items-center data-disabled:animate-pulse data-disabled:cursor-default",
                        { "bg-green-600/75 hover:bg-green-500": !isPublished },
                        { "bg-red-600/75 hover:bg-red-500": isPublished }
                    )}
                >
                    {isPending && <span className="w-4 h-4 border-3 border-white/75 rounded-full inline-block animate-spin border-b-white/25" ></span>}
                    {(isPublished ? <>Unpublish</> : <>Publish</>)}
                </Button>
            </div>
        </div>
    )
}

export default function PublishSwitch({ talentId, defaultChecked }: { talentId: string, defaultChecked: boolean }) {
    const [checked, setChecked] = useState<boolean>(defaultChecked)
    return (
        <label className="flex items-center gap-2 text-sm font-normal cursor-pointer">
            <Switch.Root
                checked={checked}
                onCheckedChange={(checked) => {
                    setChecked(checked)
                    updateIsPublished(talentId, checked)
                }}
                className="flex h-5 w-9 shrink-0 border rounded-full border-gray-500 bg-white p-0.5 transition-colors duration-150 ease-[ease] data-checked:bg-green-600 data-checked:border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950"
            >
                <Switch.Thumb className="size-3.5 bg-gray-500 transition-[translate,background-color] rounded-full duration-150 ease-[ease] data-checked:translate-x-4 data-checked:bg-white" />
            </Switch.Root>
        </label>
    );
}
