"use client"
import { Button } from "@base-ui/react"
import { useEffect, useState } from "react";
import { updateCapabilities } from "../_actions/capability-action";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import CapabilityReorderDialog from "./capability-reorder-dialog";
import { FormCombobox } from "@/components/admin/form-combobox";

export function CapabilityButton({ label, onSelect }: { label: string, onSelect: () => void }) {
    return (
        <Button onClick={() => onSelect()} type="submit"
            className="text-xs border flex items-center gap-1 transition cursor-pointer border-gray-300 hover:shadow-lg text-gray-500 bg-white rounded-full px-2 py-1 data-disabled:text-gray-300 data-disabled:cursor-default">
            {label}
        </Button>
    )
}

export function TalentCapabilityBtn({ label, onSelect }: { label: string, onSelect: () => void }) {
    return (
        <Button onClick={() => onSelect()} type="submit"
            className="text-xs border flex items-center gap-1 transition bg-gray-200 font-medium text-gray-700 cursor-pointer border-gray-300 hover:shadow-lg rounded-full px-3 py-1 data-disabled:text-gray-400 data-disabled:cursor-default">
            <span>{label}</span>  <XIcon className="text-gray-500 rounded-full size-5 p-[2px] pr-0" />
        </Button>
    )
}

export function TalentCapabilitiesForm({ talentId, defaultCapabilities, allCapabilities }: { talentId: string, defaultCapabilities: string[], allCapabilities: string[] }) {

    const [capabilities, setCapabilities] = useState<string[]>(defaultCapabilities)

    useEffect(() => {
        // ignore if same as initial list
        if (JSON.stringify(capabilities) !== JSON.stringify(defaultCapabilities)) {

            // remove duplicates before updating database
            const uniqueList = new Set(capabilities) // remove duplicates
            if (capabilities.length !== uniqueList.size) {
                setCapabilities(Array.from(uniqueList))
            } else {
                // update database
                updateCapabilities(talentId, capabilities)
                    .then(res => {
                        if (!res.success) toast.error(res.message || "failed to add capability")
                    })
            }

        }
    }, [JSON.stringify(capabilities)])

    return (
        <div>
            <h2 className="mb-2 font-semibold">Capabilities</h2>
            <div className="w-full border border-gray-200 p-6 rounded-lg bg-white">
                <div className='mb-5 flex items-center justify-between'>
                    <div>
                        <FormCombobox
                            onValueChange={(val) => {
                                if (typeof val == "string" && val.length)
                                    setCapabilities(items => [...items, val])
                            }}
                            placeholder="Add a capability"
                            clearInputOnValueChange
                            options={allCapabilities.filter(i => !capabilities.includes(i)).map(i => ({ label: i, value: i })) || []} />
                    </div>
                    <CapabilityReorderDialog onChange={(values) => setCapabilities(values)} capabilities={capabilities} />
                </div>
                <div className="flex gap-x-4 gap-y-3 flex-wrap mb-5">
                    {!capabilities.length && <div className="text-center w-full text-sm text-gray-400">No Capabilities</div>}
                    {capabilities.map(i =>
                        <TalentCapabilityBtn
                            key={i}
                            label={i}
                            onSelect={() => setCapabilities(items => items.filter(t => t !== i))} />)}
                </div>
            </div>
        </div>)
}