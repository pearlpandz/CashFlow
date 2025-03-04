import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Import Prisma Client

export async function GET() {
  try {
    const users = await prisma.user.findMany(); // Fetch all users
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse JSON body
    const { name, email, age } = body; // Extract fields

    // Validate input
    if (!name || !email) {
      return NextResponse.json({ error: "Name and Email are required" }, { status: 400 });
    }

    // Create new user in the database
    const newUser = await prisma.user.create({
      data: { name, email, age },
    });

    return NextResponse.json(newUser, { status: 201 }); // Return the created user
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}