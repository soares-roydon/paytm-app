import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../../lib/auth";
import { prisma } from "@repo/db/prismaConfig";

export async function GET() {
  const session = await getServerSession(NEXT_AUTH);

  const onRampTransactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return Response.json(onRampTransactions);
}
