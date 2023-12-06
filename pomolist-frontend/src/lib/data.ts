export const list = [
    {
        id: crypto.randomUUID(),
        title: 'Create a todo app',
        description: 'Lorem ipsum...',
        priority: 1,
        completed: false,
    },
    {
        id: crypto.randomUUID(),
        title: 'Create the list page',
        description: 'Lorem ipsum...',
        priority: 1,
        completed: false,
    },
    {
        id: crypto.randomUUID(),
        title: 'Create the input page',
        description: 'Lorem ipsum...',
        priority: 1,
        completed: false,
    },
    {
        id: crypto.randomUUID(),
        title: 'Party',
        description: 'Lorem ipsum...',
        priority: 4,
        completed: false,
    }
];

type CreateTodoDTO = {
    title: string;
    description: string;
    priority: number;
};

type DeleteTodoDTO = {
    id: string;
};

export async function createTodo(createTodoDTO: CreateTodoDTO): Promise<string> {
    const id = crypto.randomUUID();
    list.push({
        id,
        ...createTodoDTO,
        completed: false,
    });

    return id;
}

export async function toggleComplete(id: string, completed: boolean) {
    const todo = list.find((item) => item.id === id);

    // Todo: Add error checking.
    if (!todo) throw Error('Invalid todo');

    todo.completed = completed;
}


export async function deleteTodo(deleteTodoDTO: DeleteTodoDTO): Promise<void> {
    const { id } = deleteTodo;

    const idx = list.findIndex((item) => item.id === id);

    list.splice(idx, 1);
}