import type { Actions } from './$types';

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