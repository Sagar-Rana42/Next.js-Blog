import Link from 'next/link'
import React from 'react'
import SearchInput from './SearchInput'
import { ToggleMode } from './ToggleMode'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
     <div className="sticy-top-0 w-full border border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 "> 
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
            <div className="hidden md:flex items-center gap-2">
              <Button>Login</Button>
              <Button>Signup</Button>

            </div>
          </div>
          

        </div>

      </div>
    </div>
  )
}

export default Navbar