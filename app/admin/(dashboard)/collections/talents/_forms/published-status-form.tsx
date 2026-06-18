"use client"
import { Button, Form } from "@base-ui/react"
import { useActionState } from "react";
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