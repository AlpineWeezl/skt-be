import { Router } from "express";
import {
	createEvent,
	deleteEvent,
	getAllEventsByUserId,
	getSingleEventById,
	updateEvent,
} from "../controllers/eventsController.js";
import {
	adminCheck,
	authorization,
	ownAccount,
} from "../middlewares/auth.js";

export const eventsRouter = Router();

eventsRouter
	.route("/")
	.get(authorization, adminCheck, getAllUsers)
	.post(authorization, createEvent) // The token will be created after creating user, because of the need of the userId
	.all();

eventsRouter
	.route("/:eventId")
	.get(authorization, ownAccount, getSingleEventById)
	.put(authorization, ownAccount, updateEvent)
	.delete(authorization, ownAccount, deleteEvent)
	.all();

eventsRouter
	.route("/user/:userId")
	.get(authorization, ownAccount, getAllEventsByUserId)
	.all();