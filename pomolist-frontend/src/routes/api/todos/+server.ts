import { json, type RequestHandler } from '@sveltejs/kit';

import { TodoModel } from '../../../database/domains/todos/model';
import { MongooseConnection } from '../../../database/utils/database';
import type { TodoModelType } from '../../../types/types';

export const GET: RequestHandler = async () => {
    const mongoose = MongooseConnection.getInstance();

    await mongoose.connect();
    let todos = (await TodoModel.find().lean()) as TodoModelType[];
    await mongoose.disconnect();

    return json(todos);
};