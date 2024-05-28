import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const skip = Number(searchParams.get("skip") ?? "0");
  const take = Number(searchParams.get("take") ?? "10");

  if (Number.isNaN(skip) || Number.isNaN(take)) {
    return NextResponse.json(
      {
        error: "Invalid skip or take value. Please provide a valid number.",
      },
      { status: 400 },
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const json = await request.json();

  try {
    const { description, completed } = await postSchema.validate(json);

    const todo = await prisma.todo.create({
      data: {
        description,
        completed,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE() {
  const deletedTodos = await prisma.todo.deleteMany({
    where: {
      completed: true,
    },
  });

  return NextResponse.json(deletedTodos);
}
