"use client"

import { XIcon } from "lucide-react"
import { deleteCapability } from "../actions"
import { Button } from "@base-ui/react"

export default function CapabilityPill({ id, label }: { id: string, label: string }) {
    return (
        <div
            className="text-xs border flex items-center gap-1 transition bg-gray-200 font-medium text-gray-700 border-gray-300 rounded-full px-3 py-1 data-disabled:text-gray-400 data-disabled:cursor-default">
            <span>{label}</span>
            <Button
                onClick={() => deleteCapability(id)}
                className="cursor-pointer"
            >
                <XIcon className="text-gray-500 rounded-full size-5 p-[2px] pr-0 hover:text-red-500" /></Button>
        </div>
    )
}
