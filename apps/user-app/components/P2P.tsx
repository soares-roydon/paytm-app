import Button from "@repo/ui/button";
import Card from "@repo/ui/card";
import InputBox from "@repo/ui/input";
import { timeStamp } from "console";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const P2P = () => {
  const [amount, setAmount] = useState(0);
  const [recipientId, setRecipientId] = useState("");
  const [p2pTransactions, setP2pTransactions] = useState([
    {
      timestamp: "",
      amount: "",
      fromUserId: "",
      id: "",
    },
  ]);

  const session = useSession();

  useEffect(() => {
    fetch(`http://localhost:3000/api/transaction/p2pTransactions`).then(
      async (response) => {
        const data = await response.json();
        setP2pTransactions(data.transactions);
      },
    );
  }, []);

  async function sendP2p() {
    const response = await fetch("http://localhost:3000/api/transaction/p2p", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        recipientId,
      }),
    });

    const message = await response.json();

    alert(JSON.stringify(message));
  }
  return (
    <>
      <div className="font-bold text-2xl mb-2">P2P</div>
      <div className="flex flex-col gap-12">
        <div className="flex justify-center mt-30">
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
              <Button onClick={sendP2p}>Send</Button>
            </div>
          </Card>
        </div>
        <div className="w-full">
          <Card>
            <div>
              {p2pTransactions.map((item) => {
                return (
                  <div key={item.id} className="flex justify-between">
                    <div>{item.timestamp}</div>
                    <div>
                      {item.fromUserId === session.data?.user?.id ? "-" : "+"}$
                      {item.amount}
                    </div>
                    <div>{item.fromUserId}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default P2P;
