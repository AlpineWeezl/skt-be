import { Table } from "../models/Table.js";

// ###################################################################################################
// ######################################## BASIC CRUD ###############################################
// ###################################################################################################

// ########################################## Create #################################################
// ------------------------------------------ Sign up ------------------------------------------------
export const createTable = async (req, res) => {
	const { table } = req.body;
	try {
		const createdTable = await Table.create(table);
		res.status(201).json({
			Table: createdTable,
			message: "Table created, successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Creation of new Table failed!" });
	}
};

// ######################################## Read #####################################################
// ----------------------------------------- All -----------------------------------------------------
export const getAllTables = async (req, res) => {
	try {
		const tables = await Table.find();
		res.status(200).json({
			tables: tables,
			message: `${tables.length} tables found.`,
		});
	} catch (error) {
		res.status(500).json({ error: "Get all tables request failed!" });
	}
};

export const getAllTablesByEventId = async (req, res) => {
	const { eventId } = req.params;
	try {
		const tables = await Table.find({ eventId: eventId });
		res.status(200).json({
			tables: tables,
			message: `${tables.length} Tables according to event ${eventId} found.`,
		});
	} catch (error) {
		res.status(500).json({ error: "Get all tables by eventId failed!" });
	}
};

// ------------------------------------------- Single By ID ---------------------------------------------
export const getSingleTableById = async (req, res) => {
	const { tableId } = req.params;
	try {
		const table = await Table.findById(tableId);
		res.status(200).json({ table: table, message: `Table found.` });
	} catch (error) {
		res.status(500).json({ error: "Table request failed" });
	}
};

export const getSingleTableWithAllPlayersById = async (req, res) => {
	const { tableId } = req.params;
	try {
		const table = await Table.findById(tableId).populate('players');
		res.status(200).json({ table: table, message: `Table found.` });
	} catch (error) {
		res.status(500).json({ error: "Table request failed" });
	}
};

// ######################################## Update #####################################################
// -------------------------------------- Update User --------------------------------------------------
export const updateTable = async (req, res) => {
	const { tableId } = req.params;
	const { table } = req.body;
	try {
		table.modifiedAt = new Date();
		const resTable = await Table.findByIdAndUpdate(tableId, table, {
			new: true,
		});
		res.status(200).json({
			table: resTable,
			message: `${resTable.title} updated, successfully`,
		});
	} catch (error) {
		res.status(500).json({ error: "Modifying of the table failed!" });
	}
};

// ######################################## Delete #####################################################
export const deleteTable = async (req, res) => {
	const { tableId } = req.params;
	try {
		await Table.findByIdAndDelete(tableId);
		res.status(200).json({
			message: `Table ${tableId} successfully deleted!`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Deleting of the table failed!" });
	}
};

export const deleteAllTablesByEventId = async (req, res) => {
	const { eventId } = req.params;
	try {
		await Table.deleteMany({ event: eventId });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Deleting of the tables from table failed!",
		});
	}
};
