'use client'

import React, { useEffect, useMemo } from 'react'
import {
  getReadonlyProvider,
  fetchPollDetails,
  fetchAllCandidates,
} from '../../services/blockchain.service'
import { RootState } from '@/app/utils/interfaces'
import { useParams } from 'next/navigation'
import RegCandidate from '@/app/components/RegCandidate'
import { FaRegEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/app/store/globalSlices'
import { useWallet } from '@solana/wallet-adapter-react'
import CandidateList from '@/app/components/CandidateList'

export default function PollDetails() {
  const { pollId } = useParams()
  const { publicKey } = useWallet()

  const program = useMemo(() => getReadonlyProvider(), [])

  const dispatch = useDispatch()
  const { setRegModal, setCandidates, setPoll } = globalActions
  const { candidates, poll } = useSelector(
    (states: RootState) => states.globalStates
  )

  useEffect(() => {
    if (!program || !pollId) return

    // Fetch poll details
    const fetchDetails = async () => {
      await fetchPollDetails(program, pollId as string)
      await fetchAllCandidates(program, pollId as string)
    }

    fetchDetails()
  }, [program, pollId, setPoll, setCandidates, dispatch])

  if (!poll) {
    return (
      <div className="flex flex-col items-center py-10">
        <h2 className="text-gray-700 text-lg font-semibold">
          Loading poll details...
        </h2>
      </div>
    )
  }

  return (
    <div className=' min-h-full bg-gradient-to-br dark:from-purple-900 dark:via-70%  dark:via-pink-900   dark:to-purple-900'>
      <div className="  flex flex-col items-center py-10 space-y-6    transition-all duration-300 ">
        <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500">
          Poll Details
        </h2>

        <div className="bg-white  rounded-lg border border-purple-100/50 dark:border-purple-900/50 shadow-purple-300/20 hover:shadow-purple-500/20 dark:shadow-purple-500/10 shadow-xl p-6 w-4/5 md:w-3/5 space-y-4 text-center glass- transition-all duration-300 ">
          <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            {poll.description}
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <span className="font-semibold">Starts:</span>{' '}
              {new Date(poll.start).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Ends:</span>{' '}
              {new Date(poll.end).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Candidates:</span>{' '}
              {poll.candidates}
            </p>
          </div>
        </div>

        {publicKey ? (
          <button
            className="flex justify-center items-center space-x-2 bg-purple-500 text-white rounded-full
          px-6 py-2 text-lg font-bold"
            onClick={() => dispatch(setRegModal('scale-100'))}
          >
            <span>Candidates</span>
            <FaRegEdit />
          </button>
        ) : (
          <button
            className="flex justify-center items-center space-x-2 bg-purple-500 text-white rounded-full
            px-6 py-2 text-lg font-bold"
          >
            <span>Candidates</span>
          </button>
        )}

        {candidates.length > 0 && (
          <CandidateList
            candidates={candidates}
            pollAddress={poll.publicKey}
            pollId={poll.id}
          />
        )}
      </div>

      {pollId && <RegCandidate pollId={poll.id} pollAddress={poll.publicKey} />}
    </div>
  )
}
