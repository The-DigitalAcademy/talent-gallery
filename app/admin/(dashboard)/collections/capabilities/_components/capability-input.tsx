"use client"
import { Button, Input } from "@base-ui/react";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { addCapability } from "../actions";
import { toast } from "sonner";

export default function CapabilityInput() {

    const [input, setInput] = useState("")

    async function createCapability() {
        const response = await addCapability(input.trim())
        setInput("")
        if (response.success) {
            toast.success("Capability added")
        } else {
            toast.error(response.message)
        }
    }

    return (
        <div className='relative text-sm'>
            <Button
                onClick={() => createCapability()}
                className="text-gray-400 absolute right-3.5 top-2 cursor-pointer hover:text-black">
                <PlusIcon className='size-4' />
            </Button>
            <Input
                onValueChange={(val) => setInput(val)}
                type="text"
                value={input}
                placeholder="Add Capability"
                className="border rounded-full h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300  pr-10 pl-3 font-normal"
            />
        </div>
    )
}
