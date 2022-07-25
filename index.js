import "dotenv/config";
import express from "express";
import "./src/db/client.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { usersRouter } from "./src/routers/usersRouter.js";
import { eventsRouter } from "./src/routers/eventsRouter.js";
import { specs } from "./src/doc/swagger.js";
const app = express();
const port = process.env.PORT || 3001;

// ############################################################################################
// ----------------------------- Middlewares --------------------------------------------------
// ############################################################################################
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
	origin: process.env.REACT_APP_URI, // Zugriff nur von dieser Domain erlauben
	exposedHeaders: "Authorization", //dem Frontend Zugriff auf die Header-Property "Authorization" geben
};
// app.use(express());
app.use(cors(corsOptions));

// ############################################################################################
// ----------------------------- Router -------------------------------------------------------
// ############################################################################################
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
// console.log(specs);
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);

app.listen(port, () => console.log(`The server is running on port ${port}`));
