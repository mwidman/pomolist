export type TodoModelType = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: number;
};

export type TodoSummary = {
    id: string,
    title: string,
};
