import { Button, Dialog } from '@base-ui/react'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { DragDropProvider } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'
import { move } from '@dnd-kit/helpers'

export default function CapabilityReorderDialog({ capabilities, onChange }: { capabilities: string[], onChange: (values: string[]) => void }) {

    return (
        <Dialog.Root>
            <Dialog.Trigger className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg justify-center  text-sm px-3 h-7 flex gap-1  cursor-pointer transition items-center data-disabled:cursor-default">
                <ChevronsUpDownIcon className="w-4" /> <span>Reorder</span>
            </Dialog.Trigger>
            <Dialog.Portal className="text-black">
                <Dialog.Backdrop className="fixed inset-0 min-h-dvh backdrop-blur-[2px] " />
                <Dialog.Viewport>
                    <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 flex flex-col gap-4 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 shadow bg-white border border-gray-300 p-4 rounded-xl transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.9] data-starting-style:opacity-0">
                        <div className='flex justify-between items-center'>
                            <Dialog.Title className="font-semibold">Reorder Talent's Capabilities</Dialog.Title>
                            <Dialog.Close className="text-black" ><XIcon /></Dialog.Close>
                        </div>
                        <DragDropProvider onDragEnd={(event) => onChange(move(capabilities, event))}>
                            <div className="space-y-1 overflow-y-scroll max-h-[60vh]">
                                {capabilities.map((c, index) => <DraggableCapability key={c} index={index} item={c} />)}
                            </div>
                        </DragDropProvider>
                    </Dialog.Popup>
                </Dialog.Viewport>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export function DraggableCapability({ item, index }: { index: number, item: string }) {
    const { ref, isDragging } = useSortable({ id: item, index })
    return (
        <Button ref={ref} data-shadow={isDragging || undefined} className="flex items-center justify-between gap-2 w-full hover:bg-gray-100 py-1 px-1 rounded cursor-grab active:cursor-grabbing">
            <span>{item}</span>
            <ChevronsUpDownIcon className="w-4 text-gray-600" />
        </Button>)
}
