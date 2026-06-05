"use client"
import { Input } from '@base-ui/react/input';
import { SearchIcon } from 'lucide-react';
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
            <div className='relative'>
                <SearchIcon className='size-4 text-gray-400 absolute left-3.5 top-2' />
                <Input
                    onValueChange={(val) => handleSearch(val)}
                    type="search"
                    placeholder={`Search ${title}`}
                    className="border rounded-lg h-8 outline-0 focus:border-gray-600 border-gray-300 py- pl-10 pr-2 font-normal"
                />
            </div>

        </label>
    );
}
