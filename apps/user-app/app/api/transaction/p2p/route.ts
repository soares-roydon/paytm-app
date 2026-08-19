import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { NEXT_AUTH } from "../../../../lib/auth";
import { prisma } from "@repo/db/prismaConfig";

type SessionType = {
  user: {
    email: string;
    id: string;
  };
} | null;

export async function POST(req: NextRequest) {
  const session: SessionType = await getServerSession(NEXT_AUTH);
  const { amount, recipientId } = await req.json();

  if (amount < 0) {
    return Response.json(
      { message: "Amount cannot be negative" },
      { status: 400 },
    );
  }

  // 1. Check if user authenticated
  if (!session?.user) {
    return Response.json(
      { message: "Unauthenticated, try signing in." },
      { status: 401 },
    );
  }

  if (session.user.id === recipientId) {
    return Response.json(
      { message: "Cannot transfer to yourself" },
      { status: 400 },
    );
  }

  try {
    // 2. Check if recipient exist
    const recipient = await prisma.balance.findUnique({
      where: {
        userId: recipientId,
      },
    });

    if (!recipient) {
      return Response.json(
        { message: "Invalid recipient id" },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${session.user.id} FOR UPDATE`;
      const fromBalance = await tx.balance.findUnique({
        where: {
          userId: session.user.id,
        },
      });

      if (!fromBalance || fromBalance.amount / 100 < amount) {
        throw new Error("Insufficient Balance");
      }

      console.log(`Before delay`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log(`After delay`);

      await tx.balance.update({
        where: {
          userId: session.user.id,
        },
        data: {
          amount: {
            decrement: amount * 100,
          },
        },
      });
      await tx.balance.update({
        where: {
          userId: recipientId,
        },
        data: {
          amount: {
            increment: amount * 100,
          },
        },
      });
    });

    return Response.json({ message: "Tranfer successfull" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
