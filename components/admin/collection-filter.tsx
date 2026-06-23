"use client"
import { Select } from '@base-ui/react/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CheckIcon, ChevronDownIcon, ChevronsUpDown, ChevronUpIcon } from 'lucide-react';


export default function CollectionFilter({ title, options, keyName }: { title: string, options: { label: string, value: string }[], keyName: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const defaultValue = searchParams.get(keyName)

    function handleSelect(value: any) {
        const params = new URLSearchParams(searchParams);
        params.set(keyName, `${value}`)
        replace(`${pathname}?${params.toString()}`)
    };
    return (
        <div className="flex flex-col items-start gap-1">
            <Select.Root items={options} defaultValue={defaultValue} onValueChange={(val) => handleSelect(val)}>
                <Select.Trigger className="border min-w-50 rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 flex justify-between items-center gap-3 leading-none whitespace-nowrap text-sm pl-2 pr-1 font-normal">
                    <Select.Value
                        className="data-placeholder:text-gray-500"
                        placeholder={`Select ${title.toLowerCase()}`}
                    />
                    <Select.Icon>
                        <ChevronsUpDown className='w-4' />
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Positioner alignItemWithTrigger={false} className="outline-hidden select-none z-10" sideOffset={4}>
                        <Select.Popup className="group rounded-lg overflow-hidden min-w-[var(--anchor-width)] origin-[var(--transform-origin)] bg-clip-padding border border-gray-300 bg-white outline-hidden shadow transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-[side=none]:translate-y-px data-[side=none]:min-w-[calc(var(--anchor-width)+1.75rem)] data-[side=none]:data-ending-style:transition-none data-starting-style:scale-[0.98] data-starting-style:opacity-0 data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none">
                            <Select.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center bg-white text-center text-xs before:absolute data-[side=none]:before:top-[-100%] before:left-0 before:h-full before:w-full before:content-['']">
                                <ChevronUpIcon className='w-4' />
                            </Select.ScrollUpArrow>
                            <Select.List className="relative py-1 scroll-py-6 overflow-y-auto max-h-[var(--available-height)]">
                                <Select.Item
                                    value={""}
                                    className="grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 py-1.5 pr-4 pl-2.5 text-sm outline-hidden select-none data-highlighted:bg-gray-300"
                                >
                                    <Select.ItemIndicator className="col-start-1">
                                        <CheckIcon className='size-4' />
                                    </Select.ItemIndicator>
                                    <Select.ItemText className="col-start-2 text-slate-500">Select {title}</Select.ItemText>
                                </Select.Item>
                                {options.map(({ label, value }) => (
                                    <Select.Item
                                        key={label}
                                        value={value}
                                        className="grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 py-1.5 pr-4 pl-2.5 text-sm outline-hidden select-none data-highlighted:bg-gray-200"
                                    >
                                        <Select.ItemIndicator className="col-start-1">
                                            <CheckIcon className='size-4' />
                                        </Select.ItemIndicator>
                                        <Select.ItemText className="col-start-2">{label}</Select.ItemText>
                                    </Select.Item>
                                ))}
                            </Select.List>
                            <Select.ScrollDownArrow className="bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center bg-white text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:bottom-[-100%]">
                                <ChevronDownIcon className='w-4' />
                            </Select.ScrollDownArrow>
                        </Select.Popup>
                    </Select.Positioner>
                </Select.Portal>
            </Select.Root>
        </div>
    );
}
