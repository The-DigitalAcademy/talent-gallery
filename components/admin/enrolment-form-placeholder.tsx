import { ChevronsUpDownIcon } from "lucide-react";

export default function EnrolmentFormPlaceholder() {
    const fieldsTitles = ["location", "program", "cohort", "status"]
    return (
        <div className="w-full border border-gray-200 p-6 bg-white rounded-lg">
            <div className="grid grid-cols-2 gap-7 mb-5" >
                {fieldsTitles.map(field => (
                    <div key={field} className="flex flex-col items-start gap-2 w-full" >
                        <div className="text-xs text-gray-300 capitalize" >
                            {field}
                        </div>
                        <div className="border w-full text-gray-300 rounded-lg h-8 outline-0 border-gray-200 flex justify-between items-center gap-3 leading-none whitespace-nowrap text-sm pl-2 pr-1 font-normal">
                            Select {field} <ChevronsUpDownIcon className="w-4" />
                        </div>
                    </div>
                ))}
            </div>
            <button
                disabled
                type="button"
                className="rounded-xl justify-center border border-gray-200 ml-auto text-sm text-gray-300 px-3 h-8 flex gap-1 items-center"
            >
                Save Changes
            </button>
        </div>
    )
}
