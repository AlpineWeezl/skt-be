import mongoose from "mongoose";

const { Schema, model } = mongoose;

const tableSchema = new Schema({
	event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
	players: [{ type: Schema.Types.ObjectId, ref: "Player", required: true }],
	numbTable: { type: Number, required: true },
	createdAt: { type: Date, required: true, default: Date.now },
	modifiedAt: { type: Date, required: true, default: Date.now },
});

export const Table = model("Table", tableSchema);
