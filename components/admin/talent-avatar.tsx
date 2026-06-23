import { Avatar } from '@base-ui/react/avatar';

export default function TalentAvatar({ imageUrl, name }: { imageUrl: string, name: string }) {
    return (
        <Avatar.Root className="inline-flex size-8 items-center justify-center overflow-hidden rounded-full bg-neutral-200 align-middle text-sm leading-none font-normal text-neutral-950 select-none dark:bg-neutral-800 dark:text-white">
            <Avatar.Image
                src={imageUrl}
                width="48"
                height="48"
                className="size-full object-cover"
            />
            <Avatar.Fallback delay={600} className="flex size-full items-center justify-center text-sm">
                {name
                    .trim()
                    .split(/\s+/) // Splits by any amount of whitespace
                    .map(part => part[0].toUpperCase())
                    .join('')}
            </Avatar.Fallback>
        </Avatar.Root>
    );
}
