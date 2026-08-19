import Button from "@repo/ui/button";
import Card from "@repo/ui/card";
import InputBox from "@repo/ui/input";
import React, { useState } from "react";

const P2P = () => {
  const [amount, setAmount] = useState(0);
  const [ recipientId, setRecipientId ] = useState('')

  async function sendP2p() {
    const response = await fetch("http://localhost:3000/api/transaction/p2p", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount, 
        recipientId
      })
    })

    const message = await response.json()

    alert(JSON.stringify(message))
  }
  return (
    <>
      <div className="font-bold text-2xl mb-2">P2P</div>
      <div className="flex justify-center mt-50">
        <Card>
          <div className="flex flex-col gap-3">
            <InputBox
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <InputBox
              type="text"
              placeholder="Recipient id"
              onChange={(e) => {
                setRecipientId(e.target.value);
              }}
            />
            <Button
              onClick={sendP2p}
            >
              Send
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default P2P;
