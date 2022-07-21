import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new Schema({
	title: { type: String, required: true, unique: true },
	betting: { type: Number, required: true },
	admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
	createdAt: { type: Date, required: true, default: Date.now },
	modifiedAt: { type: Date, required: true, default: Date.now },
});

export const Event = model("Event", eventSchema);
