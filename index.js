import "dotenv/config";
import express from "express";
import "./src/db/client.js";
import cors from "cors";
import { userRouter } from "./src/routers/userRouter.js";
import { tournamentRouter } from "./src/routers/tournamentRouter.js";
const app = express();
const port = process.env.PORT || 3001;

// ############################################################################################
// ----------------------------- Middlewares --------------------------------------------------
// ############################################################################################
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
	origin: process.env.REACT_APP, // Zugriff nur von dieser Domain erlauben
	exposedHeaders: "Authorization", //dem Frontend Zugriff auf die Header-Property "Authorization" geben
};
app.use(cors(corsOptions));

// ############################################################################################
// ----------------------------- Router -------------------------------------------------------
// ############################################################################################
// console.log(specs);
app.use("/api/users", userRouter);
app.use("/api/events", tournamentRouter);

app.listen(port, () => console.log(`The server is running on port ${port}`));
