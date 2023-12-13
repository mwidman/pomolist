import { redirect, type Handle, error } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';

import { JWT_ACCESS_SECRET } from "$env/static/private";
import { MongooseConnection } from "./database/utils/database";
import { UserModel } from "./database/domains/users/model";
import type { UserModelType } from "./types/types";

export const handle: Handle = async ({ event, resolve }) => {
    const authCookie = event.cookies.get('AuthorizationToken');
    let user;

    if (authCookie) {
        // Remove 'Bearer' prefix
        const token = authCookie.split(' ')[1];

        try {
            const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
            if (typeof jwtUser === 'string') {
                throw new Error('Unable to verify authorization');
            }

            const mongoose = MongooseConnection.getInstance();
            await mongoose.connect();
            user = await UserModel.findById<UserModelType>(jwtUser.id).lean();
            await mongoose.disconnect();

            if (!user) {
                throw new Error('User not found');
            }

            const sessionUser = {
                id: user.id,
                email: user.email
            };

            event.locals.user = sessionUser;
        } catch (error) {
            console.error(error);
        }
    }

    if (event.url.pathname.startsWith('/todos') && !(authCookie || user)) {
        throw error(401, 'You must login before accessing this page.');
    }

    return await resolve(event);
}