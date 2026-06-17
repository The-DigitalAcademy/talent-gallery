"use client"
import { Capability, FormState } from "@/app/lib/definitions"
import { Button, Form } from "@base-ui/react"
import { useActionState } from "react";
import { deleteCapability, insertCapability } from "../actions/capability-action";
import { XIcon } from "lucide-react";

const initialState: FormState = {
    success: false,
    message: '',
};

export function AddCapabilityForm({ capability, talentId }: { capability: Capability, talentId: string }) {
    const addCapability = insertCapability.bind(null, capability.id, talentId)
    const [state, formAction, isPending] = useActionState(addCapability, initialState);

    return (
        <Form action={formAction} className="h-fit">
            <Button
                disabled={isPending}
                type="submit"
                className="text-xs border transition cursor-pointer border-gray-300 hover:shadow-lg text-gray-500 bg-white rounded-full px-2 py-1"
            >
                {capability.name}
            </Button>
        </Form>
    )
}

export function DeleteCapabilityForm({ talentCapabilityId, capabilityName, talentId }: { talentCapabilityId: string, capabilityName: string, talentId: string }) {
    const addCapability = deleteCapability.bind(null, talentCapabilityId, talentId)
    const [state, formAction, isPending] = useActionState(addCapability, initialState);

    return (
        <Form action={formAction}>
            <Button
                disabled={isPending}
                type="submit"
                className="text-xs border flex items-center gap-1 transition bg-gray-200 font-medium text-gray-700 cursor-pointer border-gray-300 hover:shadow-lg rounded-full px-3 py-1"
            >
                <span>{capabilityName}</span>  <XIcon className="border text-gray-500 rounded-full size-5 p-[2px]" />
            </Button>
        </Form>
    )
}