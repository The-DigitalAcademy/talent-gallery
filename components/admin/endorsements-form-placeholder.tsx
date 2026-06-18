export default function EndorsementsFormPlaceholder() {
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
