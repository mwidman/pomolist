export type TodoModelType = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: number;
    user: UserModelType;
};

export type TodoSummary = {
    id: string,
    title: string,
    completed: boolean,
};

export type UserModelType = {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
