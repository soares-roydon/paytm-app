import { prisma } from "@repo/db/prismaConfig";
import express from "express";

const app = express();

app.use(express.json());

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
      await prisma.$transaction([
        prisma.balance.update({
          where: {
            userId: paymentInformation.userId,
          },
          data: {
            amount: {
              increment: Number(paymentInformation.amount),
            },
          },
        }),
        prisma.onRampTransaction.update({
          where: {
            token: paymentInformation.token,
          },
          data: {
            status: "Success",
          },
        }),
      ]);
      
      res.json({
        message: "captured"
      })
} catch(e) {
    console.log(e)
    res.json({
        message: "Failed"
    })
}
});

app.listen(3003)
