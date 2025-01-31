"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
       (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    },[]);

  return (
    <nav className="flex-between w-full mb-16pt-3">
      <Link href='/' className="flex gap-2 flex-center" >
        <Image src='/assets/images/PostIt.png' width={100} height={100} alt="PostIt logo" className="object-contain" />
      </Link>

      {/* {alert(providers)} */}

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        { session?.user ? (
            <div className="flex gap-3 md:gap-5" >
                <Link href="/create-prompt" className="black_btn" >
                    Create Post
                </Link>
                <Link href="/profile" className="black_btn" >
                    My Prompts
                </Link>
                <button type="button" onClick={signOut} className="outline_btn">
                    Sign Out
                </button>

                <Image src={session?.user.image} width={37} height={37}
                className="rounded-full" alt="profile" />
            </div>
        ) : (
            <>
                {providers && Object.values(providers).map((provider) => (
                    <button type="button" key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn">
                        Sign In
                    </button>
                ))}
            </>
        ) }
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
            <div className="flex">
                <Image 
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="profile"
                    onClick={() => setToggleDropdown((prev) => !prev)}    
                />
                {
                    toggleDropdown && (
                        <div className="dropdown">
                            <Link href='/profile' className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}>
                            My Prompts
                            </Link>
                            <Link href='/create-prompt' className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}>
                            Create Prompt
                            </Link>
                            <button type="button" 
                                onClick={() => {
                                    setToggleDropdown(false)
                                    signOut();
                                    }}
                                    className="mt-5 w-full black_btn">
                                    SignOut
                            </button>
                        </div>
                    )
                }
            </div>
        ) : 
        (
            <>
                {providers && Object.values(providers).map((provider) => (
                    <button type="button" key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn">
                        Sign In
                    </button>
                ))}
            </>
        )}
      </div>
    </nav>
  )
}

export default Nav