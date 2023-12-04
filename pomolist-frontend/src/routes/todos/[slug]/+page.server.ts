import { list } from '$lib/data';

type Todo = {
    slug: string;
    title: string;
    description: string;
    priority: number;
    completed: boolean;
};

export function load({ params }): { todo: Todo } {
    const todo = list.find((item) => item.id === params.slug);

    if (!todo) throw Error('Todo not found');

    return {
        todo: {
            slug: todo.id,
            ...todo
        }
    };
}

export const actions = {
    markComplete: async ({ request }) => {
        const data = await request.formData();
        console.log(data);
    }
}