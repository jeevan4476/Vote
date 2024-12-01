'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Vote } from 'lucide-react'
const Header = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Vote className="h-6 w-6" />
          <Link href="/" className="text-xl font-bold">
            Votee
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/create" className="text-gray-600 hover:text-gray-900">
            Create
          </Link>
          {isMounted && (
  <WalletMultiButton
    style={{ backgroundColor: '#F97316', color: 'white' }}
  />
)}
        </nav>
      </div>
    </header>
  )
}

export default Header

