import { list } from '$lib/data';

type TodoSummary = {
    slug: string,
    title: string,
};

export function load(): { todos: TodoSummary[] } {
    return {
        todos: list.map((todo) => ({
            slug: todo.id,
            title: todo.title
        }))
    };
}
