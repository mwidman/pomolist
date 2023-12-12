import mongoose from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';

import type { TodoModelType } from '../../../types/types';

const TodoSchema = new mongoose.Schema<TodoModelType>({
    title: String,
    description: String,
    completed: Boolean,
    priority: {
        type: Number,
        default: 3,
    },
});

TodoSchema.plugin(mongooseLeanId);

export const TodoModel =
    mongoose.models.Todo ?? mongoose.model<TodoModelType>('Todo', TodoSchema);