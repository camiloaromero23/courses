import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request) {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      {
        description: "Soul stone",
        completed: true,
      },
      {
        description: "Power stone",
      },
      {
        description: "Time stone",
      },
      {
        description: "Space stone",
      },
      {
        description: "Reality stone",
      },
    ],
  });

  return NextResponse.json({
    message: "Seed Executed",
  });
}
