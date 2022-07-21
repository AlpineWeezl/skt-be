import mongoose from "mongoose";

const { Schema, model } = mongoose;

const playerSchema = new Schema({
	event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
	firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nickname: { type: String},
	club: { type: String },
	city: { type: String },
	createdAt: { type: Date, required: true, default: Date.now },
	modifiedAt: { type: Date, required: true, default: Date.now },
});

export const Player = model("Player", playerSchema);
