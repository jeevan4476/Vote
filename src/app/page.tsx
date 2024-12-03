'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  fetchAllPolls,
  getCounter,
  getProvider,
  getReadonlyProvider,
  initialize,
} from './services/blockchain.service'
import Link from 'next/link'
import { Poll } from './utils/interfaces'
import { BN } from '@coral-xyz/anchor'
import { useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

type PollType = {
  candidates: number,
  description: string,
  start: number,
  publicKey: string,
  end: number,
  id: number
}

export default function Page() {
  const [polls, setPolls] = useState<Poll[]>([])
  const { publicKey, signTransaction, sendTransaction } = useWallet()
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const programReadOnly = useMemo(() => getReadonlyProvider(), [])

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  )

  const fetchData = async () => {
    fetchAllPolls(programReadOnly).then((data) => setPolls(data as any))
    const count = await getCounter(programReadOnly)
    setIsInitialized(count.gte(new BN(0)))
  }

  useEffect(() => {
    if (!programReadOnly) return
    fetchData()
  }, [programReadOnly])

  const handleInit = async () => {
    // alert(isInitialized && !!publicKey)
    if (isInitialized && !!publicKey) return

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          const tx = await initialize(program!, publicKey!)
          console.log(tx)

          await fetchData()
          resolve(tx as any)
        } catch (error) {
          console.error('Transaction failed:', error)
          reject(error)
        }
      }),
      {
        pending: 'Approve transaction...',
        success: 'Transaction successful ',
        error: 'Encountered error ',
      }
    )
  }

  return (
    <div className="flex-1 relative h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-50/30 to-pink-100/50 dark:from-10% dark:from-slate-900 dark:via-70%  dark:via-neutral-800 dark:to-90%    dark:to-pink-900  " />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"/>
      
      {isInitialized && polls.length < 1 && (
        <>
          <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-500">
            List of Polls
          </h2>
          <p>We don&apos;t have any polls yet, be the first to create one.</p>
        </>
      )}

      {!isInitialized && publicKey && (
        <button
          onClick={handleInit}
          className="bg-gray-800 text-white rounded-full
          px-6 py-2 text-lg font-bold mb-8"
        >
          Initialize
        </button>
      )}

      {!publicKey && polls.length < 1 && (
        <>
          <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-500">
            List of Polls
          </h2>
          <p>We don&apos;t have any polls yet, please connect wallet.</p>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container mx-auto px-4 py-8 "
      >
        <h1 className="text-4xl font-bold text-center mb-8  bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-500">
            List of Polls
          </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' >
        {polls.filter(poll => poll.end > Date.now()).map((poll, index) => (
          <FeatureCard poll={poll} key={index} />
        ))}
        
        </div>
      </motion.div>
    </div>
  )
}


function FeatureCard({ poll } : { poll: PollType }) {
  console.log(poll)
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className=" p-6 rounded-lg glass-effect border border-purple-100/50 dark:border-purple-900/50 shadow-lg hover:shadow-purple-500/20 dark:shadow-purple-500/10 transition-all duration-300"
      key={poll.publicKey}
      >
      <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
      {poll.description.length > 20
                ? poll.description.slice(0, 25) + '...'
                : poll.description}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">
      <span className="font-semibold">Starts:</span>{' '}
      {new Date(poll.start).toLocaleString()}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
      <span className="font-semibold">Ends:</span>{' '}
      {new Date(poll.end).toLocaleString()}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
      <span className="font-semibold">Candidates:</span>{' '}
      {poll.candidates}
      </p>
      <Link
                href={`/polls/${poll.publicKey}`}
                className="flex items-center"
              >
      <button
            
            className="relative inline-flex items-center px-4 py-3 rounded-lg overflow-hidden group  mt-4 "
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500" />
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-white font-medium flex items-center">
              
                View Poll
              
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          </Link>
    </motion.div>
  );
}