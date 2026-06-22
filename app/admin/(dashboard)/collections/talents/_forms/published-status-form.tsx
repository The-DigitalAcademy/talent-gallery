"use client"
import { Button, Form, Switch } from "@base-ui/react"
import { useActionState, useState } from "react";
import { updateIsPublished } from "../_actions/published-status-action";
import { FormState } from "@/app/lib/definitions";
import clsx from "clsx";

const initialState: FormState = {
    success: false,
    message: '',
};

export function PublishedStatusForm({ isPublished, talentId }: { isPublished: boolean, talentId: string }) {
    const addCapability = updateIsPublished.bind(null, talentId, !isPublished)
    const [state, formAction, isPending] = useActionState(addCapability, initialState);

    return (
        <Form action={formAction} className="h-fit">
            <div className="flex justify-end items-center gap-4">
                <Button
                    disabled={isPending}
                    focusableWhenDisabled
                    type="submit"
                    className={clsx("rounded-xl justify-center border border-gray-300 text-sm px-5 h-8 flex gap-1 text-white font-semibold shadow-sm cursor-pointer transition items-center data-disabled:animate-pulse data-disabled:cursor-default",
                        { "bg-green-600/75 hover:bg-green-500": !isPublished },
                        { "bg-red-600/75 hover:bg-red-500": isPublished }
                    )}
                >
                    {isPending &&
                        <span className="w-4 h-4 border-3 border-white rounded-full inline-block animate-spin border-b-transparent" ></span>
                    }
                    {!isPending &&
                        (isPublished ?
                            <>Unpublish</> :
                            <>Publish</>)}
                </Button>
            </div>
        </Form>
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
                className="flex h-5 w-9 shrink-0 border rounded-full border-gray-500 bg-white p-0.5 transition-colors duration-150 ease-[ease] data-checked:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950"
            >
                <Switch.Thumb className="size-3.5 bg-gray-500 transition-[translate,background-color] rounded-full duration-150 ease-[ease] data-checked:translate-x-4 data-checked:bg-white" />
            </Switch.Root>
        </label>
    );
}
