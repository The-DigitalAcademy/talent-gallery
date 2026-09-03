'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@base-ui/react'
import { createClient } from '@/app/lib/supabase/client'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSocialLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase = createClient()
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: process.env.NEXT_PUBLIC_ADMIN_REDIRECT_URL,
                },
            })

            if (error) throw error
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred')
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-col gap-6 border border-gray-300 rounded-xl p-6'>
            <div className="flex gap-2 items-center text-3xl">
                <Image src='/shaper-logo-sm.png' width={50} height={50} alt="shaper logo" className="size-10" />
                <span className="font-semibold">Talent</span>
                <span className="font-light">Admin</span>
            </div>
            <div>
                <div className="text-2xl">Welcome!</div>
                <div className='text-sm text-gray-500'>Sign in to your account to continue</div>
            </div>
            <form onSubmit={handleSocialLogin}>
                <div className="flex flex-col gap-6">
                    {error && <p className="text-sm text-destructive-500">{error}</p>}
                    <Button type="submit" className="w-full border border-gray-300 rounded-lg h-8 hover:bg-gray-100 active:bg-gray-100 focus:bg-gray-100 cursor-pointer" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Continue with Google'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
