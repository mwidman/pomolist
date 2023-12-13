import { error, json, type RequestHandler } from '@sveltejs/kit';

import { TodoModel } from '../../../database/domains/todos/model';
import { MongooseConnection } from '../../../database/utils/database';
import type { TodoModelType } from '../../../types/types';
import { UserModel } from '../../../database/domains/users/model';

export const GET: RequestHandler = async ({ locals }) => {
    const user = locals.user;

    if (!user) {
        throw error(401, 'You must be logged in.')
    }

    const mongoose = MongooseConnection.getInstance();
    await mongoose.connect();
    const dbUser = <TodoModelType[]>await UserModel
        .findById(user.id)
        .lean()
        .populate('todos')
        .select('todos');
    await mongoose.disconnect();

    const todos = dbUser.todos ?? [];
    return json(todos);
};

export const POST: RequestHandler = async ({ locals, request }) => {
    const user = locals.user;

    if (!user) {
        throw error(401, 'You must be logged in.')
    }

    const inputTodo = await request.json();
    inputTodo.completed = false;

    const mongoose = MongooseConnection.getInstance();

    await mongoose.connect();
    const todo = new TodoModel(inputTodo);
    await todo.save();
    await UserModel
        .findByIdAndUpdate(user.id, 
            { $push: { "todos": todo._id } }
        );
    await mongoose.disconnect();

    return new Response(null, { status: 201 });
}