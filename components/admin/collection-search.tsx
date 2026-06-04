"use client"
import { Input } from '@base-ui/react/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function CollectionSearch({ title, keyName }: { title: string, keyName: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        params.set(keyName, `${term}`)
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <label className="flex flex-col items-start gap-1 text-sm font-bold text-neutral-950 dark:text-white">
            {title}
            <Input
                onValueChange={(val) => handleSearch(val)}
                type="search"
                placeholder={`search ${title}`}
                className="h-8 w-40 border border-slate-300 dark:border-white bg-white dark:bg-neutral-950 px-2 text-sm any-pointer-coarse:text-base font-normal text-neutral-950 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-1 focus:-outline-offset-1 focus:outline-slate-500 dark:focus:outline-white"
            />
        </label>
    );
}
