import Button from "@repo/ui/button";
import Card from "@repo/ui/card";
import InputBox from "@repo/ui/input";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { NEXT_AUTH } from "../lib/auth";

const AddMoneyCard = () => {
  const [amount, setAmount] = useState();
  const [bank, setBank] = useState("");
  const session = useSession();

  return (
    <Card>
      <div className="font-bold text-lg mb-2">Add money</div>
      <div className="flex flex-col gap-3">
        <div>
          <div>Amount</div>
          <InputBox
            type="text"
            placeholder="Amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div>
          <div>Bank</div>
          <InputBox
            type="text"
            placeholder="Bank"
            onChange={(e) => {
              setBank(e.target.value);
            }}
          />
        </div>

        <Button
          onClick={() => {
            fetch(`http://localhost:3000/api/transaction/initiate-new`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                amount,
                bank,
              }),
            });
          }}
        >
          Add Money
        </Button>
      </div>
    </Card>
  );
};

export default AddMoneyCard;
