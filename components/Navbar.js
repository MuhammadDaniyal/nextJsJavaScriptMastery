'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
// these utility func are make the signin and sigup flow incredibly simple

const Navbar = () => {

    const { data: session } = useSession() // able the get current user data

    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setProvider = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        setProvider()
    }, [])


    return (
        <>
            <nav className='w-full flex-between mb-16 pt-3'>
                <Link href={'/'} className='flex gap-2 flex-center'>
                    <Image
                        src={'/assets/images/logo.svg'}
                        width={30}
                        height={30}
                        className='object-contain'
                        alt='logo'
                    />
                    <p className='logo_text'>Promptopia</p>
                </Link>

                {/* Desktop Navigation */}
                <div className='sm:flex hidden'>
                    {
                        session?.user ? (
                            <>
                                <div className='flex gap-3 md:gap-5'>
                                    <Link href={'create-prompt'} className='black_btn'>
                                        Create Post
                                    </Link>
                                    <button type="button" onClick={signOut} className='outline_btn'>
                                        Sign out
                                    </button>
                                    <Link href={'/profile'}>
                                        <Image
                                            src={session?.user.image}
                                            width={37}
                                            height={37}
                                            className='rounded-full'
                                            alt='profile'
                                        />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                {providers &&
                                    Object.values(providers).map((provider) => ( // next-auth ky tmam providers ma sy jo chyee woh access
                                        <button
                                            type='button'
                                            key={provider.name}
                                            onClick={() => {
                                                signIn(provider.id);
                                            }}
                                            className='black_btn'
                                        >
                                            Sign in
                                        </button>
                                    ))}
                            </>
                        )
                    }
                </div>

                {/* Mobile Navigation */}
                <div className='sm:hidden flex relative'>
                    {
                        session?.user ? (
                            <>
                                <div className="flex">
                                    <Image
                                        src={'/assets/images/logo.svg'}
                                        width={37}
                                        height={37}
                                        className='rounded-full'
                                        alt='profile'
                                        onClick={() => setToggleDropdown((prev) => !prev)}
                                    />
                                    {toggleDropdown && (
                                        <div className='dropdown'>
                                            <Link
                                                href='/profile'
                                                className='dropdown_link'
                                                onClick={() => setToggleDropdown(false)}
                                            >
                                                My Profile
                                            </Link>
                                            <Link
                                                href='/create-prompt'
                                                className='dropdown_link'
                                                onClick={() => setToggleDropdown(false)}
                                            >
                                                Create Prompt
                                            </Link>
                                            <button
                                                type='button'
                                                onClick={() => {
                                                    setToggleDropdown(false);
                                                    signOut();
                                                }}
                                                className='mt-5 w-full black_btn'
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                {providers &&
                                    Object.values(providers).map((provider) => ( // next-auth ky tmam providers ma sy jo chyee woh access
                                        <button
                                            type='button'
                                            key={provider.name}
                                            onClick={() => {
                                                signIn(provider.id);
                                            }}
                                            className='black_btn'
                                        >
                                            Sign in
                                        </button>
                                    ))}
                            </>
                        )
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar