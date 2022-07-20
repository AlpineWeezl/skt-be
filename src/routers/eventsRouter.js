import { Router } from "express";
import {
	createEvent,
	deleteEvent,
	getAllEvents,
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
	.get(authorization, adminCheck, getAllEvents)
	.post(authorization, createEvent)
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