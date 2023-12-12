import type { TodoModelType, TodoSummary } from '../../../types/types';

export async function load({ fetch }): Promise<{ todos: TodoSummary[] }> {
    const response = (await fetch("/api/todos"));
    const todos = await response.json();

    return {
        todos: todos.map((todo: TodoModelType) => ({
            id: todo._id,
            title: todo.title
        }))
    };
}
