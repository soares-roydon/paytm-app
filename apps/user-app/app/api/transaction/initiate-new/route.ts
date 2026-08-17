import { prisma } from "@repo/db/prismaConfig";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { NEXT_AUTH } from "../../../../lib/auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH)
    
    const { amount, bank } = await req.json()

    const token = Math.random().toString()
    

    console.log(amount, bank)
    try {
        const details = await prisma.onRampTransaction.create({
            data: {
                userId: session.user.id,
                startTime: new Date,
                status: "Processing",
                provider: bank,
                amount: Number(amount) * 100,
                token
            }
        })

        return Response.json({message: "Initiated Transaction", details})

    } catch (e) {
        console.log(
            `
            -------------------------------------------------------------------------------
            ${e}
            -------------------------------------------------------------------------------
            `
        )
    }
}