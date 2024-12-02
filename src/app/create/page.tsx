'use client'

import { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { BN } from '@coral-xyz/anchor'
import {
  createPoll,
  getCounter,
  getProvider,
} from '../services/blockchain.service'
import { useWallet } from '@solana/wallet-adapter-react'
import { Vote } from 'lucide-react'
import { motion } from 'framer-motion'
import Form from '../components/PollForm'

const Page: NextPage = () => {
  const { publicKey, sendTransaction, signTransaction } = useWallet()
  const [nextCount, setNextCount] = useState<BN>(new BN(0))
  const [isInitialized, setIsInitialized] = useState(false)

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  )

  const [formData, setFormData] = useState({
    description: '',
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    const fetchCounter = async () => {
      if (!program) return
      const count = await getCounter(program)
      setNextCount(count.add(new BN(1)))
      setIsInitialized(count.gte(new BN(0)))
    }

    fetchCounter()
  }, [program, formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!program || !isInitialized) return

    const { description, startDate, endDate } = formData

    const startTimestamp = new Date(startDate).getTime() / 1000
    const endTimestamp = new Date(endDate).getTime() / 1000

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          const tx = await createPoll(
            program!,
            publicKey!,
            nextCount,
            description,
            startTimestamp,
            endTimestamp
          )

          setFormData({
            description: '',
            startDate: '',
            endDate: '',
          })

          console.log(tx)
          resolve(tx as any)
        } catch (error) {
          console.error('Transaction failed:', error)
          reject(error)
        }
      }),
      {
        pending: 'Approve transaction...',
        success: 'Transaction successful 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    

<div className="min-h-screen bg-gradient-to-br from-purple-100/50 via-blue-50/30 to-pink-100/50 dark:from-purple-900/30 dark:via-blue-900/20 dark:to-pink-900/30">
<div className="container mx-auto px-4 py-8">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-2xl mx-auto"
  >
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 border border-purple-100/50 dark:border-purple-900/50">
      <div className="flex items-center justify-center mb-6">
        <Vote className="h-8 w-8 text-purple-600 mr-2" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500">
          Create Poll
        </h1>
      </div>
      <Form
          formData={formData}
          setFormData={setFormData}
          program={program}
          isInitialized={isInitialized}
          handleSubmit={handleSubmit}
        />
    </div>
  </motion.div>
</div>
</div>
  )
}

export default Page

