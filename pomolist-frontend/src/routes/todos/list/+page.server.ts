import { list } from '$lib/data';

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
