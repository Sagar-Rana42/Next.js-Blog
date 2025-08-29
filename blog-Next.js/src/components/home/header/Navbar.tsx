"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import SearchInput from './SearchInput'
import { ToggleMode } from './ToggleMode'
import { Button } from '@/components/ui/button'
import { Menu, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SignedIn, SignedOut, SignIn, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  const [menuOpen , setMenuOpen] = useState(false);
  return (
     <div className="sticky-top-0 w-full border border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 "> 
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
         {/* left section */}
          <div className="flex items-center gap-8">
            <Link href={'/'} className="flex items-center space-x-2">
              <span className="font-bold text-2xl">
                <span className="bg-gradient-to-r from-indigo-600 dark:from-purple-600 dark:to-purple-400 to-indigo-400 bg-clip-text text-transparent">Byte</span>
                <span>Code</span>
              </span>
            </Link>

          </div>

          {/* for desktop view */}
          <div className="hidden md:flex items-center gap-4 "> 
            <Link href={"/articles"} className="text-sm font-medium text-foreground transition-colors hover:text-foreground">Articles </Link>
            <Link href={"/tutorial"} className="text-sm font-medium text-foreground transition-colors hover:text-foreground">tutorial </Link>
            <Link href={"/about"} className="text-sm font-medium text-foreground transition-colors hover:text-foreground">About </Link>
            <Link href={"/dashboard"} className="text-sm font-medium text-foreground transition-colors hover:text-foreground">Dashboard </Link>
            

          </div>

          {/* Right View */}
          <div className="flex gap-2 items-center">
            <SearchInput/>
            <ToggleMode/>

            <SignedIn>
              <UserButton/>
            </SignedIn>

            <SignedOut>
              <div className="hidden md:flex items-center gap-2">
                <SignInButton>
                  <Button variant={"outline"}>Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Signup</Button>
                </SignUpButton>
              </div>
            </SignedOut>

            
          </div>

        
          {/* Hamberger menu */}
          <Button
           variant={'ghost'}
            size={'icon' }
            className='md:hidden hover:text-foreground'
            onClick={()=>setMenuOpen(!menuOpen)}
          >
            {
              menuOpen ? (<X className='h-5 w-5'/>) : (<Menu className='h-5 w-5'/>)
            }
          </Button>
        </div>
      </div>


      {/* // mobile navbar */}
      {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t ">
            {/* Search Bar (Mobile) */}
            <div className="px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 w-full focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 px-4">
              <Link
                href="/articles"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/tutorials"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Tutorials
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>

            {/* Mobile Auth Buttons */}

            <SignedOut>
              <div className="px-4 flex flex-col gap-2">
                <SignInButton>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <Button className="w-full">Sign up</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        )}
    </div>
  )
}

export default Navbar