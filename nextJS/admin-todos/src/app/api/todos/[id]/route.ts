import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  return todo;
};

export async function GET(_: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      {
        error: `Todo with id ${params.id} not found`,
      },
      { status: 404 },
    );
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  completed: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      {
        error: `Todo with id ${params.id} not found`,
      },
      { status: 404 },
    );
  }

  const json = await request.json();

  try {
    const { description, completed } = await putSchema.validate(json);

    const todo = await prisma.todo.update({
      where: {
        id: params.id,
      },
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
