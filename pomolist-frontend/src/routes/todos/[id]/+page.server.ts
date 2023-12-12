import { error, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

type Todo = {
    id: string;
    title: string;
    description: string;
    priority: number;
    completed: boolean;
};

export const load = ( async ({ params, fetch }): Promise<{ todo: Todo }> => {
    const response = await fetch(`/api/todos/${params.id}`);
    const todo = await response.json();

    if (!todo) {
        throw error(400, "Not found");
    };

    return {
        todo
    };
}) satisfies PageServerLoad;

export const actions = {
    delete: async ({ request, fetch }) => {
        const data = await request.formData();
        const id = data.get('id');
        await fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        });
        // Must redirect since this Todo no longer exists.
        throw redirect(302, '/todos/list')
    },
} satisfies Actions;