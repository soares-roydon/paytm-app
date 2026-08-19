import { prisma } from "@repo/db/prismaConfig";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/webhook/hdfc", async (req, res) => {
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  try {
    await prisma.$transaction(async (tx) => {
      // Objective: Bank - Tells that the payment has been done by the user | So
      // 1. Add the money in user's account
      // 2. Update the onRamp status from `PROCESSING` to `SUCCESS`
      // NOTE: Do not accept the request twice if the status is NOT `PROCESSING`

      const onRampTransaction = await tx.onRampTransaction.findUnique({
        where: {
          token: paymentInformation.token,
        },
      });

      if (!onRampTransaction || onRampTransaction.status !== "Processing") {
        throw new Error("Transaction have already been processed");
      }

      await tx.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      });

      await tx.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      });
    });
    res.status(200).json({
      message: "captured",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Failed",
    });
  }
});

app.listen(3003);
