import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Import Prisma Client

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        // Convert id to integer
        const userId = parseInt(id);

        // Fetch user from database
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}