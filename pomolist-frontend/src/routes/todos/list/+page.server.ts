import type { Actions } from './$types';
import { list, createTodo } from '$lib/data';

type TodoSummary = {
    id: string,
    title: string,
};

export function load(): { todos: TodoSummary[] } {
    return {
        todos: list.map((todo) => ({
            id: todo.id,
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