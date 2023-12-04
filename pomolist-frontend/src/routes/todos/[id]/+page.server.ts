import { list } from '$lib/data';

type Todo = {
    id: string;
    title: string;
    description: string;
    priority: number;
    completed: boolean;
};

export function load({ params }): { todo: Todo } {
    const todo = list.find((item) => item.id === params.id);

    if (!todo) throw Error('Todo not found');

    return {
        todo
    };
}

export const actions = {
    markComplete: async ({ request }) => {
        const data = await request.formData();
        console.log(data);
    }
}