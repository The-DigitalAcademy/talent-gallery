"use client"
import { Select } from '@base-ui/react/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CheckIcon, ChevronDownIcon, ChevronsUpDown, ChevronUpIcon } from 'lucide-react';


export default function CollectionFilter({ title, options, keyName }: { title: string, options: { label: string, value: string }[], keyName: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSelect(value: any) {
        const params = new URLSearchParams(searchParams);
        params.set(keyName, `${value}`)
        replace(`${pathname}?${params.toString()}`)
    };
    return (
        <div className="flex flex-col items-start gap-1">
            <Select.Root items={options} onValueChange={(val) => handleSelect(val)}>
                <Select.Trigger className="flex h-8 min-w-40 items-center justify-between gap-3 pl-2 pr-1 text-sm leading-none whitespace-nowrap border border-slate-300 dark:border-white bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white select-none hover:not-data-disabled:bg-slate-100 dark:hover:not-data-disabled:bg-neutral-800 active:not-data-disabled:bg-neutral-200 dark:active:not-data-disabled:bg-neutral-700 data-disabled:border-neutral-500 data-disabled:text-neutral-500 disabled:border-neutral-500 disabled:text-neutral-500 dark:data-disabled:border-neutral-400 dark:data-disabled:text-neutral-400 data-popup-open:bg-neutral-100 dark:data-popup-open:bg-neutral-800 font-normal focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950 dark:focus-visible:outline-white">
                    <Select.Value
                        className="data-placeholder:text-neutral-500 dark:data-placeholder:text-neutral-400"
                        placeholder={`Select ${title.toLowerCase()}`}
                    />
                    <Select.Icon>
                        <ChevronsUpDown className='w-4' />
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Positioner className="outline-hidden select-none z-10" sideOffset={4}>
                        <Select.Popup className="group min-w-[var(--anchor-width)] origin-[var(--transform-origin)] bg-clip-padding border border-slate-300 bg-white text-neutral-950 outline-hidden shadow transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-[side=none]:translate-y-px data-[side=none]:min-w-[calc(var(--anchor-width)+1.75rem)] data-[side=none]:data-ending-style:transition-none data-starting-style:scale-[0.98] data-starting-style:opacity-0 data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none dark:border-white dark:bg-neutral-950 dark:text-white dark:shadow-none">
                            <Select.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center bg-white text-center text-xs before:absolute data-[side=none]:before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] dark:bg-neutral-950">
                                <ChevronUpIcon className='w-4' />
                            </Select.ScrollUpArrow>
                            <Select.List className="relative py-1 scroll-py-6 overflow-y-auto max-h-[var(--available-height)]">
                                <Select.Item
                                    value={""}
                                    className="grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 py-1.5 pr-4 pl-2.5 text-sm outline-hidden select-none data-highlighted:bg-neutral-950 data-highlighted:text-white dark:data-highlighted:bg-white dark:data-highlighted:text-neutral-950"
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
                                        className="grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 py-1.5 pr-4 pl-2.5 text-sm outline-hidden select-none data-highlighted:bg-neutral-950 data-highlighted:text-white dark:data-highlighted:bg-white dark:data-highlighted:text-neutral-950"
                                    >
                                        <Select.ItemIndicator className="col-start-1">
                                            <CheckIcon className='size-4' />
                                        </Select.ItemIndicator>
                                        <Select.ItemText className="col-start-2">{label}</Select.ItemText>
                                    </Select.Item>
                                ))}
                            </Select.List>
                            <Select.ScrollDownArrow className="bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center bg-white text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:bottom-[-100%] dark:bg-neutral-950">
                                <ChevronDownIcon className='w-4' />
                            </Select.ScrollDownArrow>
                        </Select.Popup>
                    </Select.Positioner>
                </Select.Portal>
            </Select.Root>
        </div>
    );
}
