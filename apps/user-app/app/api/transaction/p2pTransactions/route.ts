import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { NEXT_AUTH } from "../../../../lib/auth";
import { prisma } from "@repo/db/prismaConfig";

export async function GET(req: NextRequest) {
  const session = await getServerSession(NEXT_AUTH);

  if (!session.user)
    Response.json({ message: "Unauthenticated, try signing in" });

  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        {
          toUserId: session.user.id,
        },
        {
          fromUserId: session.user.id,
        },
      ],
    },
  });

  return Response.json({ transactions });
}
