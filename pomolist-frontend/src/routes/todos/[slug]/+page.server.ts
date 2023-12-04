import { list } from '$lib/data';

type Todo = {
    title: string;
    description: string;
    priority: number;
};

export function load({ params }): { todo: Todo } {
    const todo = list.find((item) => item.id === params.slug);

    if (!todo) throw Error('Todo not found');

    return {
        todo
    };
}