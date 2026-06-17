"use client"
import { AddCapabilityForm, DeleteCapabilityForm } from "@/app/admin/(dashboard)/collections/talents/forms/capability-form";
import { Capability } from "@/app/lib/definitions";
import { Input } from "@base-ui/react";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

type Props = {
    capabilities: Capability[],
    talentCapabilities: { id: string, capabilityId: string, capabilityName: string }[],
    talentId: string
}

export function TalentCapabilitiesSection({ capabilities, talentCapabilities = [], talentId }: Props) {

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