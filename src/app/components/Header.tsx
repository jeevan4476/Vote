'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Vote } from 'lucide-react'
import { motion } from 'framer-motion'
import { ThemeToggle } from './Theme-toggle'
import { Button } from '../ui/button'
const Header = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-lg border-b border-purple-100/50 dark:border-purple-900/50"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-blue-50/30 to-pink-100/50 dark:from-purple-900/30 dark:via-blue-900/20 dark:to-pink-900/30" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
      <nav className="container relative mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Vote className="h-8 w-8 text-purple-600" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500">
            Vote
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/create">
            <Button className="bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 text-white hover:opacity-90">
              Create
            </Button>
          </Link>
          {isMounted && (
  <WalletMultiButton />
)}
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  )
}

export default Header




// function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
//   return (
//     <Link 
//       href={href} 
//       className="relative group"
//     >
//       <span className=" dark:text-gray-200 font-medium transition-colors group-hover:text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-blue-500 group-hover:to-pink-500">
//         {children}
//       </span>
//       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 transition-all group-hover:w-full" />
//     </Link>
//   );
// }