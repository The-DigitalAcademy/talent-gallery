import { ChevronsUpDownIcon, SearchIcon } from "lucide-react";

export function CapabilitiesFormPlaceholder() {
    const capabilities = ['React', 'PHP', 'AWS', 'UI/UX Design', 'Docker', 'Figma', 'Azure', 'Microservices', 'Node.js', 'C#']
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
                        <div key={item} className="text-xs border flex items-center gap-1 border-gray-200 text-gray-300 bg-white rounded-full px-2 py-1">
                            {item}
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export function EndorsementsFormPlaceholder() {
    return (
        <div>
            <h2 className="mb-2 font-semibold">Endorsements</h2>
            <div className="w-full border border-gray-200 p-6 bg-white rounded-lg">
                <div className="grid grid-cols-3 gap-7">
                    <div
                        className="flex flex-col gap-2 border border-gray-200 p-3 rounded-lg">
                        <div className="border w-full text-gray-300 rounded-lg h-8 outline-0 border-gray-200 flex justify-between items-center gap-3 leading-none whitespace-nowrap text-sm pl-2 pr-1 font-normal">
                            Endorser Name
                        </div>
                        <div className="border w-full h-25 text-gray-300 rounded-lg h-8 outline-0 border-gray-200 gap-3 leading-none text-sm p-2 font-normal">
                            Message
                        </div>
                        <button
                            disabled
                            type="button"
                            className="rounded-xl justify-center border border-gray-200 ml-auto text-sm text-gray-300 px-3 h-8 flex gap-1 items-center"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 col-span-2 overflow-y-scroll max-h-55 pr-5">
                        <div className="w-full text-sm text-gray-300 h-full flex items-center justify-center">No Endorsements</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function EnrolmentFormPlaceholder() {
    const fieldsTitles = ["location", "program", "cohort", "status"]
    return (
        <div>
            <h2 className="mb-2 font-semibold">Enrolment</h2>
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
        </div>
    )
}

export function ProfileLinksFormPlaceholder() {
    const fieldsTitles = ["Youtube URL", "Portfolio URL", "LinkedIn URL", "GitHub URL"]
    return (
        <div>
            <h2 className="mb-2 font-semibold">Profile Links</h2>
            <div className="w-full border border-gray-200 p-6 bg-white rounded-lg">
                <div className="grid grid-cols-2 gap-7 mb-5" >
                    {fieldsTitles.map(field => (
                        <div key={field} className="flex flex-col items-start gap-2 w-full" >
                            <div className="text-xs text-gray-300 capitalize" >
                                {field}
                            </div>
                            <div className="border w-full text-gray-300 rounded-lg h-8 outline-0 border-gray-200 flex justify-between items-center gap-3 leading-none whitespace-nowrap text-sm pl-2 pr-1 font-normal">
                                http://websitelink.url
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
        </div>
    )
}

export function ProjectsFormPlaceholder() {
    return (
        <div>
            <h2 className="mb-2 font-semibold">Projects</h2>
            <div className="w-full border border-gray-200 p-6 bg-white rounded-lg">
                <div className="grid grid-cols-3 gap-7">
                    <div
                        className="flex flex-col gap-2 border border-gray-200 p-3 rounded-lg">
                        <div className="border w-full text-gray-300 rounded-lg h-8 outline-0 border-gray-200 flex justify-between items-center gap-3 leading-none whitespace-nowrap text-sm pl-2 pr-1 font-normal">
                            Project Name
                        </div>
                        <div className="border w-full h-25 text-gray-300 rounded-lg h-8 outline-0 border-gray-200 gap-3 leading-none text-sm p-2 font-normal">
                            Description
                        </div>
                        <button
                            disabled
                            type="button"
                            className="rounded-xl justify-center border border-gray-200 ml-auto text-sm text-gray-300 px-3 h-8 flex gap-1 items-center"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 col-span-2 overflow-y-scroll max-h-55 pr-5">
                        <div className="w-full text-sm text-gray-300 h-full flex items-center justify-center">No Projects</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function WorkExperienceFormPlaceholder() {
    return (
        <div>
            <h2 className="mb-2 font-semibold">Work Experience</h2>
            <div className="w-full border border-gray-200 p-6 bg-white rounded-lg">
                <div className="grid grid-cols-3 gap-7">
                    <div className="flex flex-col gap-2 border border-gray-200 p-3 rounded-lg">
                        <div className="border w-full text-gray-300 rounded-lg h-8 outline-0 border-gray-200 flex justify-between items-center gap-3 leading-none whitespace-nowrap text-sm pl-2 pr-1 font-normal">
                            Company
                        </div>
                        <div className="border w-full text-gray-300 rounded-lg h-8 outline-0 border-gray-200 flex justify-between items-center gap-3 leading-none whitespace-nowrap text-sm pl-2 pr-1 font-normal">
                            Role
                        </div>
                        <div className="border w-full text-gray-300 rounded-lg h-8 outline-0 border-gray-200 flex justify-between items-center gap-3 leading-none whitespace-nowrap text-sm pl-2 pr-1 font-normal">
                            Duration
                        </div>
                        <div className="border w-full h-20 text-gray-300 rounded-lg h-8 outline-0 border-gray-200 gap-3 leading-none text-sm p-2 font-normal">
                            Description
                        </div>
                        <button
                            disabled
                            type="button"
                            className="rounded-xl justify-center border border-gray-200 ml-auto text-sm text-gray-300 px-3 h-8 flex gap-1 items-center"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 col-span-2 overflow-y-scroll max-h-55 pr-5">
                        <div className="w-full text-sm text-gray-300 h-full flex items-center justify-center">No Work Experience</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
