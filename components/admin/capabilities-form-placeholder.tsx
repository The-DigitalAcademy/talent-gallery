import { Capability } from "@/app/lib/definitions";
import { SearchIcon } from "lucide-react";

export default function CapabilitiesFormPlaceholder({ capabilities }: { capabilities: Capability[] }) {
    return (
        <div>
            <h2 className="mb-2 font-semibold">Capabilities</h2>
            <div className="w-full border border-gray-200 p-6 rounded-lg bg-white">
                <div className="border rounded-full h-8 w-50 flex items-center gap-2 border-gray-200 px-3 text-gray-300 mb-5 text-sm font-normal">
                    <SearchIcon className='size-4 text-gray-200' />  filter capabilities
                </div>
                <div className="text-xs text-gray-300 mb-3">Talent Capabilities</div>
                <div className="text-center w-full text-sm text-gray-300 mb-5">No Capabilities</div>
                <div className="text-xs text-gray-300 mb-3">Select a capability</div>
                <div className="flex gap-x-4 gap-y-3 flex-wrap h-fit overflow-y-scroll py-1">
                    {capabilities.map(item =>
                        <div key={item.id} className="text-xs border flex items-center gap-1 border-gray-200 text-gray-300 bg-white rounded-full px-2 py-1">
                            {item.name}
                        </div>)}
                </div>
            </div>
        </div>
    )
}
