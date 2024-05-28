"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { createTodo, deleteCompleted } from "../actions/actions";

// import * as todosApi from "../helpers/todos";

export const NewTodo = () => {
  const [description, setDescription] = useState("");

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (description.trim().length === 0) return;

    // await todosApi.createTodo(description);
    await createTodo(description);

    setDescription("");

    // router.refresh();
  };

  // const deleteCompleted = async () => {
  // await deleteCompleted
  // await todosApi.deleteCompleted();

  // router.refresh();
  // }

  return (
    <form className="flex w-full" onSubmit={onSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="What needs to be done?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Create
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2">Delete completed</span>
      </button>
    </form>
  );
};
