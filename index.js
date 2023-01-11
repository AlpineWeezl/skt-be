import "dotenv/config";
import express from "express";
import "./src/db/client.js";
import cors from "cors";
<<<<<<< HEAD
import swaggerUi from "swagger-ui-express";
import { usersRouter } from "./src/routers/usersRouter.js";
import { eventsRouter } from "./src/routers/eventsRouter.js";
import { specs } from "./src/doc/swagger.js";
=======
import { userRouter } from "./src/routers/userRouter.js";
import { tournamentRouter } from "./src/routers/tournamentRouter.js";
>>>>>>> beb9492 (fix - doublette check)
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
<<<<<<< HEAD
// app.use(express());
=======
>>>>>>> beb9492 (fix - doublette check)
app.use(cors(corsOptions));

// ############################################################################################
// ----------------------------- Router -------------------------------------------------------
// ############################################################################################
<<<<<<< HEAD
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
// console.log(specs);
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
=======
// console.log(specs);
app.use("/api/users", userRouter);
app.use("/api/events", tournamentRouter);
>>>>>>> beb9492 (fix - doublette check)

app.listen(port, () => console.log(`The server is running on port ${port}`));
