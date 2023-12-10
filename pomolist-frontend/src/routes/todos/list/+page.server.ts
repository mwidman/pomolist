import type { Actions } from './$types';

import type { TodoModelType, TodoSummary } from '../../../types/types';

export async function load({ fetch }): Promise<{ todos: TodoSummary[] }> {
    const response = (await fetch("/api/todos"));
    const todos = await response.json();
    console.dir(todos);

    return {
        todos: todos.map((todo: TodoModelType) => ({
            id: todo._id,
            title: todo.title
        }))
    };
}

export const actions = {
    create: async ({ request, fetch }) => {
        const data = await request.formData();
        const todo = {
            title: data.get('title'),
            description: data.get('description'),
            priority: data.get('priority'),
        };
        const id = await fetch("/api/todos", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });
    }
} satisfies Actions