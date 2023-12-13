import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_ACCESS_SECRET } from '$env/static/private';
import { UserModel } from './model';
import { MongooseConnection } from '../../utils/database';
import type { UserModelType } from '../../../types/types';

export async function createUser(email: string, password: string): Promise<void> {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const mongoose = MongooseConnection.getInstance();
    await mongoose.connect();
    const user = new UserModel({
        email,
        password: encryptedPassword,
        todos: [],
    });
    await user.save();
    await mongoose.disconnect();
}

export async function loginUser(email: string, password: string): Promise<{ error: string }|{ token: string }> {
    const mongoose = MongooseConnection.getInstance();
    await mongoose.connect();
    const user = await UserModel.findOne<UserModelType>({ email: email }).lean();
    mongoose.disconnect();

    if (!user) {
        return {
            error: 'Invalid credentials'
        };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return {
            error: 'Invalid credentials'
        };
    }

    const jwtUser = {
        id: user.id,
        email: user.email,
    };

    const token = jwt.sign(jwtUser, JWT_ACCESS_SECRET, {
        expiresIn: '1d',
    });

    return { token };
}