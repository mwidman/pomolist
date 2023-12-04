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
    create: async ({ request }) => {
        const data = await request.formData();
        const id = await createTodo({
            title: data.get('title'),
            description: data.get('description'),
            priority: data.get('priority'),
        });
    }
} satisfies Actions