import { Router } from "express";
import {
	createEvent,
	deleteEvent,
	getAllEvents,
	getAllEventsByUserId,
	getSingleEventById,
	updateEvent,
} from "../controllers/eventsController.js";
import { adminCheck, authorization, ownAccount } from "../middlewares/auth.js";

export const tournamentRouter = Router();

tournamentRouter
	.route("/")
	.get(authorization, adminCheck, getAllEvents)
	.post(authorization, createEvent)
	.all();

tournamentRouter
	.route("/:eventId")
	.get(authorization, ownAccount, getSingleEventById)
	.put(authorization, ownAccount, updateEvent)
	.delete(authorization, ownAccount, deleteEvent)
	.all();

tournamentRouter
	.route("/user/:userId")
	.get(authorization, ownAccount, getAllEventsByUserId)
	.all();
