import { Event } from "../models/Event.js";

// ###################################################################################################
// ######################################## BASIC CRUD ###############################################
// ###################################################################################################

// ########################################## Create #################################################
// ------------------------------------------ Sign up ------------------------------------------------
export const createEvent = async (req, res) => {
	const { event, newUser } = req.body;
	try {
		event.admin = newUser._id;
		const createdEvent = await Event.create(event);
		res.status(201).json({
			event: createdEvent,
			message: "Event created, successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Creation of new event failed!" });
	}
};

// ######################################## Read #####################################################
// ----------------------------------------- All -----------------------------------------------------
export const getAllEvents = async (req, res) => {
	try {
		const events = await Event.find();
		res.status(200).json({
			events: events,
			message: `${events.length} events found.`,
		});
	} catch (error) {
		res.status(500).json({ error: "Get all events request failed!" });
	}
};

export const getAllEventsByUserId = async (req, res) => {
	const { userId } = req.params;
	try {
		const events = await Event.find({ userId: userId });
		res.status(200).json({
			events: events,
			message: `${events.length} events according to user ${userId} found.`,
		});
	} catch (error) {
		res.status(500).json({ error: "Get all events by userId failed!" });
	}
};

// ------------------------------------------- Single By ID ---------------------------------------------
export const getSingleEventById = async (req, res) => {
	const { eventId } = req.params;
	try {
		const event = await Event.findById(eventId);
		res.status(200).json({ event: event, message: `Event found.` });
	} catch (error) {
		res.status(500).json({ error: "Event request failed" });
	}
};

// ######################################## Update #####################################################
// -------------------------------------- Update User --------------------------------------------------
export const updateEvent = async (req, res) => {
	const { eventId } = req.params;
	const { event } = req.body;
	try {
		event.modifiedAt = new Date();
		const resEvent = await Event.findByIdAndUpdate(eventId, event, {
			new: true,
		});
		res.status(200).json({
			event: resEvent,
			message: `${resEvent.title} updated, successfully`,
		});
	} catch (error) {
		res.status(500).json({ error: "Modifying of the event failed!" });
	}
};

// ######################################## Delete #####################################################
export const deleteEvent = async (req, res) => {
	const { eventId } = req.params;
	try {
		await Event.findByIdAndDelete(eventId);
		res.status(200).json({
			message: `Event ${eventId} successfully deleted!`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Deleting of the event failed!" });
	}
};

export const deleteAllEventsByUserId = async (req, res) => {
	const { userId } = req.params;
	try {
		await Event.deleteMany({ admin: userId });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Deleting of the events from user failed!",
		});
	}
};
