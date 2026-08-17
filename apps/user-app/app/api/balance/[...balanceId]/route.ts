import { NextRequest, NextResponse } from "next/server";
import { NEXT_AUTH } from "../../../../lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@repo/db/prismaConfig";

export async function GET(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH)

    if(!session) Response.json(null)

    const balance = await prisma.balance.findFirst({
        where: {
            userId: session.user.id
        }
    })

    return Response.json(balance)
}

export async function POST(req: NextRequest) {
    const userId = await req.json()
    return Response.json(userId)
}