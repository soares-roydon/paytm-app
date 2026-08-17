import React from 'react'
import AddMoneyCard from './AddMoneyCard'
import BalanceCard from './BalanceCard'
import RecentTransactionsCard from './RecentTransactionsCard'

const Transfer = () => {
  return (
    <>
    <div className="font-bold text-2xl mb-2">Transfer</div>
    <div className='grid grid-cols-2 gap-2 my-4 mx-2'>
        <AddMoneyCard />
        <div className='flex flex-col gap-2'>
            <BalanceCard />
            <RecentTransactionsCard />
        </div>
    </div>
    </>
  )
}

export default Transfer