import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, select: false, required: true },
        firstname: { type: String, required: false },
        lastname: { type: String, required: false },
        admin: { type: Boolean, required: true, default: false },
        createdAt: { type: Date, required: true, default: Date.now },
        modifiedAt: { type: Date, required: true, default: Date.now }
    }
);

export const User = model('User', userSchema);