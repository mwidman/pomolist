import type { RequestHandler } from './$types';

import { MongooseConnection } from '../../../../database/utils/database';
import { TodoModel } from '../../../../database/domains/todos/model';

/*
export const GET: RequestHandler = async () => {
    return new Response();
};
*/

export const PUT: RequestHandler = async ({ params, request }) => {
    const { id } = params;
    const { completed } = await request.json();

    const mongoose = MongooseConnection.getInstance();

    await mongoose.connect();
    await TodoModel.findByIdAndUpdate((id), {
        completed
    });
    await mongoose.disconnect();

    return new Response(null, { status: 204 });
}

export const DELETE: RequestHandler = async ({ params }) => {
    const { id } = params;

    const mongoose = MongooseConnection.getInstance();

    await mongoose.connect();
    await TodoModel.findByIdAndDelete(id);
    await mongoose.disconnect();

    return new Response(null, { status: 204 });
}