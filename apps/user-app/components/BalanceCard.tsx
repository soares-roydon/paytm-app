"use client"

import Card from "@repo/ui/card";
import React from "react";
import { useEffect, useState } from "react";

interface BalanceType {
    locked: number,
    amount: number
}

const BalanceCard = () => {
  const [ balance, setBalance ] = useState<BalanceType>({
    locked: 0,
    amount: 0
  })

  useEffect(() => {
    fetch(`http://localhost:3000/api/balance/get-balance`).then(async (response) => {
      const balance = await response.json()
      setBalance(balance)
    })
  }, [])

return (
    <Card>
      <div>
        <div className="font-bold text-lg mb-2">Balance</div>
      </div>
      <div className="flex justify-between border-b border-zinc-200 py-1.5 px-2">
        <div>Unlocked Balance</div>
        <div>${balance.amount / 100}</div>
      </div>
      <div className="flex justify-between border-b border-zinc-200 py-1.5 px-2">
        <div>Total Locked Balance</div>
        <div>${balance.locked / 100}</div>
      </div>
      <div className="flex justify-between border-b border-zinc-200 py-1.5 px-2">
        <div>Total Balance</div>
        <div>${(balance.locked + balance.amount) / 100}</div>
      </div>
    </Card>
  );
};

export default BalanceCard;
