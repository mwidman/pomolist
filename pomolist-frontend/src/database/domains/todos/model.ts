import mongoose from 'mongoose';

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

export const TodoModel =
    mongoose.models.Todo ?? mongoose.model<TodoModelType>('Todo', TodoSchema);