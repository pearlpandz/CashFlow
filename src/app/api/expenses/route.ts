import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// Get all expenses for a user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const expenses = await prisma.expense.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

// Create a new expense
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, description, category, userId, date } = body;

    // Validate input
    if (!amount || !description || !category || !userId) {
      return NextResponse.json(
        { error: "Amount, description, category, and userId are required" },
        { status: 400 }
      );
    }

    // Create new expense
    const newExpense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        description,
        category,
        userId: parseInt(userId),
        date: date ? new Date(date) : new Date(),
      },
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
  }
} 