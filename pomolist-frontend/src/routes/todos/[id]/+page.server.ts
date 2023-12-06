import { redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { list, deleteTodo } from '$lib/data';

type Todo = {
    id: string;
    title: string;
    description: string;
    priority: number;
    completed: boolean;
};

export const load = (({ params }): { todo: Todo } => {
    const todo = list.find((item) => item.id === params.id);

    if (!todo) {
        throw redirect(302, '/todos/list');
    };

    return {
        todo
    };
}) satisfies PageServerLoad;

export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        console.log(id);
        await deleteTodo(data.get('id'));
    },
} satisfies Actions;