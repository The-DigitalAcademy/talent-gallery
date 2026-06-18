"use client"
import { Capability, FormState } from "@/app/lib/definitions"
import { Button, Form, Input } from "@base-ui/react"
import { useActionState, useState } from "react";
import { deleteCapability, insertCapability } from "../actions/capability-action";
import { SearchIcon, XIcon } from "lucide-react";

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
                className="text-xs border flex items-center gap-1 transition cursor-pointer border-gray-300 hover:shadow-lg text-gray-500 bg-white rounded-full px-2 py-1 data-disabled:text-gray-300 data-disabled:cursor-default"
            >
                {isPending && <span className="w-3 h-3 border-2 border-gray-600 rounded-full inline-block animate-spin border-b-gray-100" ></span>}{capability.name}
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
                className="text-xs border flex items-center gap-1 transition bg-gray-200 font-medium text-gray-700 cursor-pointer border-gray-300 hover:shadow-lg rounded-full px-3 py-1 data-disabled:text-gray-400 data-disabled:cursor-default"
            >
                {isPending && <span className="w-3 h-3 border-2 border-gray-600 rounded-full inline-block animate-spin border-b-gray-200" ></span>}
                <span>{capabilityName}</span>  <XIcon className="border text-gray-500 rounded-full size-5 p-[2px]" />
            </Button>
        </Form>
    )
}

type Props = {
    capabilities: Capability[],
    talentCapabilities: { id: string, capabilityId: string, capabilityName: string }[],
    talentId: string
}
export function TalentCapabilitiesForm({ capabilities, talentCapabilities = [], talentId }: Props) {

    const [searchTerm, setSearchTerm] = useState<string>("")
    return (
        <div>
            <h2 className="mb-2 font-semibold">Capabilities</h2>
            <div className="w-full border border-gray-200 p-6 rounded-lg bg-white">
                <div className='relative text-sm mb-5'>
                    <SearchIcon className='size-4 text-gray-400 absolute left-3.5 top-2' />
                    <Input
                        value={searchTerm}
                        onValueChange={(value) => setSearchTerm(value)}
                        type="search"
                        placeholder="filter capabilities"
                        className="border rounded-full h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 py- pl-10 pr-2 font-normal"
                    />
                </div>
                <div className="flex gap-x-4 gap-y-3 flex-wrap mb-5">
                    {talentCapabilities.map(i => <DeleteCapabilityForm key={i.id} talentCapabilityId={i.id} capabilityName={i.capabilityName} talentId={talentId} />)}
                </div>
                <div className="text-xs text-gray-700 mb-3">Select a capability</div>
                <div className="flex gap-x-4 gap-y-3 flex-wrap h-fit overflow-y-scroll py-1">
                    {capabilities
                        .filter(i => !talentCapabilities.map(i => i.capabilityId).includes(i.id)) // exclude capabilities already selected
                        .filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())) // search term filter functionality
                        .map(i => <AddCapabilityForm key={i.id} capability={i} talentId={talentId} />)}
                </div>
            </div>
        </div>)
}