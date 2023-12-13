
import mongoose, { Schema } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';

import type { UserModelType } from '../../../types/types';

const UserSchema = new mongoose.Schema<UserModelType>({
    // Username is only required after creating account.
    username: {
        type: String,
        index: true,
        unique: true,
        minlength: 5,
    },
    email: { 
        type: String,
        index: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: Date,
    updatedAt: Date,
});

UserSchema.plugin(mongooseLeanId);

export const UserModel =
    mongoose.models.User ?? mongoose.model<UserModelType>('User', UserSchema);