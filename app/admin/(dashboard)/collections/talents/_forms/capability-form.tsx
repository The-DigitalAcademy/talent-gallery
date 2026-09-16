"use client"
import { Button, Input } from "@base-ui/react"
import { useEffect, useState } from "react";
import { deleteCapability, insertCapability, updateCapability } from "../_actions/capability-action";
import { SearchIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/app/lib/supabase/client";
import CapabilityReorderDialog from "./capability-reorder-dialog";

type Capability = {
    id: string;
    name: string;
}

export type TalentCapability = Capability & { sortPosition: number }


export function CapabilityButton({ capability, onSelect }: { capability: Capability, onSelect: (value: Capability) => void }) {
    return (
        <Button
            onClick={() => onSelect(capability)}
            type="submit"
            className="text-xs border flex items-center gap-1 transition cursor-pointer border-gray-300 hover:shadow-lg text-gray-500 bg-white rounded-full px-2 py-1 data-disabled:text-gray-300 data-disabled:cursor-default"
        >
            {capability.name}
        </Button>
    )
}

export function TalentCapabilityBtn({ capability, onSelect }: { capability: TalentCapability, onSelect: (value: TalentCapability) => void }) {

    return (
        <Button
            onClick={() => onSelect(capability)}
            type="submit"
            className="text-xs border flex items-center gap-1 transition bg-gray-200 font-medium text-gray-700 cursor-pointer border-gray-300 hover:shadow-lg rounded-full px-3 py-1 data-disabled:text-gray-400 data-disabled:cursor-default"
        >
            <span>{capability.name}</span>  <XIcon className="text-gray-500 rounded-full size-5 p-[2px] pr-0" />
        </Button>
    )
}

export function TalentCapabilitiesForm({ talentId }: { talentId: string }) {

    const [searchTerm, setSearchTerm] = useState<string>("")
    const [availableCapabilities, setAvailableCapabilities] = useState<Capability[] | []>([])
    const [talentCapabilities, setTalentCapabilities] = useState<TalentCapability[] | []>([])
    const [isLoadingCapabilities, setIsLoadingCapabilities] = useState(true)
    const [isLoadingTalentCapabilities, setIsLoadingTalentCapabilities] = useState(true)

    async function addCapability(item: Capability) {
        // set to highest position + 1000
        const newPosition = talentCapabilities?.length ? Math.max(...talentCapabilities.map(i => i.sortPosition)) + 1000 : 1000

        // optimistically update UI state
        setTalentCapabilities(items => [...items, { ...item, sortPosition: newPosition }])

        // db update
        const result = await insertCapability(item.id, talentId, newPosition)
        if (!result.success) {
            // revert UI state update
            toast.error(result.message || "failed to add capability")
            setTalentCapabilities(items => items.filter(i => i.id !== item.id))
        }

    }

    async function removeCapability(item: TalentCapability) {
        // optimistically update UI state
        setTalentCapabilities(items => items.filter(i => i.id !== item.id))

        // db update
        const result = await deleteCapability(item.id, talentId)
        if (!result.success) {
            // revert UI state update
            toast.error(result.message || "failed to remove capability")
            setTalentCapabilities(items => [...items, { ...item }])
        }
    }

    async function updatePosition(item: { id: string, sortPosition: number }) {
        setTalentCapabilities(items => items.map((capability) => {
            if (capability.id == item.id) {
                return { id: capability.id, name: capability.name, sortPosition: item.sortPosition }
            } else return capability
        }))

        const response = await updateCapability(talentId, item.id, { sortPosition: item.sortPosition })
        if (response.success) {
            toast.success("item reordered")
        } else toast.error("failed to reorder item", { description: response.message })
    }

    useEffect(() => {
        async function fetchCapabilities() {
            setIsLoadingCapabilities(true)
            const supabase = await createClient()
            const { data: capsData, error: capsError } = await supabase.from("capabilities").select("id, name")
            if (capsError) toast.error("Couldn't fetch capabilites", { description: capsError.message })
            else setAvailableCapabilities(capsData)
            setIsLoadingCapabilities(false)

            setIsLoadingTalentCapabilities(true)
            const { data: talentCapsData, error: talentCapsError } = await supabase.from("talent_capabilities").select("capabilities (id, name), sortPosition:sort_position").eq("talent_id", talentId)
            if (talentCapsError) toast.error("Couldn't fetch talent's capabilites", { description: talentCapsError.message })
            else {
                const data = talentCapsData.map(({ capabilities, sortPosition }) => ({ ...capabilities, sortPosition })) as unknown as TalentCapability[]
                setTalentCapabilities(data)
            }
            setIsLoadingTalentCapabilities(false)
        }
        fetchCapabilities()
    }, [])

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
                <div className="flex items-center justify-between mb-3 gap-3">
                    <div className="text-xs text-gray-700">Talent Capabilities</div>
                    <CapabilityReorderDialog onPositionUpdate={(val) => updatePosition(val)} capabilities={talentCapabilities} />
                </div>
                <div className="flex gap-x-4 gap-y-3 flex-wrap mb-5">
                    {isLoadingTalentCapabilities && <span className="w-4 h-4 border-3 border-gray-500 rounded-full inline-block animate-spin border-b-white/25" ></span>}
                    {!talentCapabilities.length && <div className="text-center w-full text-sm text-gray-400">No Capabilities</div>}
                    {talentCapabilities.toSorted((a, b) => (a.sortPosition) - (b.sortPosition)).map(i => <TalentCapabilityBtn key={i.id} capability={i} onSelect={(val) => removeCapability(val)} />)}
                </div>
                <div className="text-xs text-gray-700 mb-3">Select a capability</div>
                <div className="flex gap-x-4 gap-y-3 flex-wrap h-fit overflow-y-scroll py-1">
                    {isLoadingCapabilities && <span className="w-4 h-4 border-3 border-gray-500 rounded-full inline-block animate-spin border-b-white/25" ></span>}
                    {availableCapabilities
                        .filter(i => !talentCapabilities.map(i => i.id).includes(i.id)) // exclude capabilities already selected
                        .filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())) // search term filter functionality
                        .toSorted()
                        .map(i => <CapabilityButton key={i.id} capability={i} onSelect={(val) => addCapability(val)} />)}
                </div>
            </div>
        </div>)
}