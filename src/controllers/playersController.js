import { Player } from "../models/Player.js";

// ###################################################################################################
// ######################################## BASIC CRUD ###############################################
// ###################################################################################################

// ########################################## Create #################################################
// ------------------------------------------ Sign up ------------------------------------------------
export const createPlayer = async (req, res) => {
	const { player } = req.body;
	try {
		const createdPlayer = await Player.create(player);
		res.status(201).json({
			Player: createdPlayer,
			message: "Player created, successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Creation of new Player failed!" });
	}
};

// ######################################## Read #####################################################
// ----------------------------------------- All -----------------------------------------------------
export const getAllPlayers = async (req, res) => {
	try {
		const players = await Player.find();
		res.status(200).json({
			players: players,
			message: `${players.length} players found.`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Get all players request failed!" });
	}
};

export const getAllPlayersByEventId = async (req, res) => {
	const { eventId } = req.params;
	try {
		const players = await Player.find({ event: eventId });
		res.status(200).json({
			players: players,
			message: `${players.length} players according to event ${eventId} found.`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Get all players by eventId failed!" });
	}
};

// ------------------------------------------- Single By ID ---------------------------------------------
export const getSinglePlayerById = async (req, res) => {
	const { playerId } = req.params;
	try {
		const player = await player.findById(playerId);
		res.status(200).json({ player: player, message: `Player found.` });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Player request failed" });
	}
};

// ######################################## Update #####################################################
// -------------------------------------- Update User --------------------------------------------------
export const updatePlayer = async (req, res) => {
	const { playerId } = req.params;
	const { player } = req.body;
	try {
		player.modifiedAt = new Date();
		const resPlayer = await Player.findByIdAndUpdate(playerId, player, {
			new: true,
		});
		res.status(200).json({
			player: resPlayer,
			message: `${resPlayer.title} updated, successfully`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Modifying of the player failed!" });
	}
};

// ######################################## Delete #####################################################
export const deletePlayer = async (req, res) => {
	const { playerId } = req.params;
	try {
		await Player.findByIdAndDelete(playerId);
		res.status(200).json({
			message: `Player ${playerId} successfully deleted!`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Deleting of the Player failed!" });
	}
};

export const deleteAllPlayersByUserId = async (req, res) => {
	const { userId } = req.params;
	try {
		await Player.deleteMany({ admin: userId });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Deleting of the Players from user failed!",
		});
	}
};
