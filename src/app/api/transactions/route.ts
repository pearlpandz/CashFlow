import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// Get all transactions for a user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: parseInt(userId),
        ...(type && { type })
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

// Create a new transaction
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, description, category, userId, date, type } = body;

    // Validate input
    if (!amount || !description || !category || !userId) {
      return NextResponse.json(
        { error: "Amount, description, category, and userId are required" },
        { status: 400 }
      );
    }

    // Create new transaction
    const newTransaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        description,
        category,
        userId: parseInt(userId),
        date: date ? new Date(date) : new Date(),
        type,
      },
    });

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
  }
} 

// Bulk create transactions
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { transactions } = body;

    // Validate input
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return NextResponse.json(
        { error: "Transactions array is required and must not be empty" },
        { status: 400 }
      );
    }

    // Validate each transaction
    for (const transaction of transactions) {
      const { amount, description, category, userId, type } = transaction;
      if (!amount || !description || !category || !userId || !type) {
        return NextResponse.json(
          { error: "Each transaction must have amount, description, category, userId and type" },
          { status: 400 }
        );
      }
    }

    // Create all transactions
    const createdTransactions = await prisma.transaction.createMany({
      data: transactions.map(t => ({
        amount: parseFloat(t.amount),
        description: t.description,
        category: t.category,
        userId: parseInt(t.userId),
        date: t.date ? new Date(t.date) : new Date(),
        type: t.type
      }))
    });

    return NextResponse.json(createdTransactions, { status: 201 });
  } catch (error) {
    return NextResponse.json({ errorMsg: "Failed to create transactions", error }, { status: 500 });
  }
}

// Update a transaction
export async function PATCH(request: Request) {
  try {
    const transactions = await request.json();

    // Validate input
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return NextResponse.json(
        { error: "Transactions array is required and must not be empty" },
        { status: 400 }
      );
    }

    // Update all transactions
    const updatedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        const { id, ...payload } = transaction;
        return prisma.transaction.update({
          where: { id: parseInt(id) },
          data: payload,
        });
      })
    );

    return NextResponse.json(updatedTransactions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ errorMsg: "Failed to update transactions", error }, { status: 500 });
  }
}
