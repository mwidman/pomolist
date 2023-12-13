import mongoose from 'mongoose';
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

    const mongooseConnection = MongooseConnection.getInstance();
    await mongooseConnection.connect();
    const todos = <TodoModelType[]>await TodoModel
        .find({ user: new mongoose.Types.ObjectId(user.id)})
        .lean();
    await mongooseConnection.disconnect();
    return json(todos);
};

export const POST: RequestHandler = async ({ locals, request }) => {
    const user = locals.user;

    if (!user) {
        throw error(401, 'You must be logged in.')
    }

    const inputTodo = await request.json();

    const mongooseConnection = MongooseConnection.getInstance();
    await mongooseConnection.connect();
    const todo = new TodoModel({
        ...inputTodo,
        completed: false,
        user: new mongoose.Types.ObjectId(user.id),
    });
    await todo.save();
    await mongooseConnection.disconnect();

    return new Response(null, { status: 201 });
}