// const sleep = (seconds: number = 0): Promise<boolean> => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

export const createTodo = async (description: string) => {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};
export const updateTodo = async (todoId: string, completed: boolean) => {
  // TODO: Optimistic update
  // await sleep(1);
  const response = await fetch(`/api/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

export const deleteCompleted = async () => {
  const response = await fetch("/api/todos", {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete completed todos");
  }

  return response.json();
};
