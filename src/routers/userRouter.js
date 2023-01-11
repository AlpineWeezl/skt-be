import { Router } from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getSingleUserByUserId,
	logIn,
	updateUser,
	verifySession,
} from "../controllers/usersController.js";
import {
	adminCheck,
	authorization,
	createToken,
	encryptPassword,
	credentialCheck,
	ownAccount,
} from "../middlewares/auth.js";
import { doubleEmailUsernameCheck } from "../middlewares/userChecks.js";

export const userRouter = Router();

userRouter
	.route("/")
	.get(authorization, adminCheck, getAllUsers)
	.post(encryptPassword, doubleEmailUsernameCheck, createUser) // The token will be created after creating user, because of the need of the userId
	.all();

userRouter.route("/auth").get(authorization, adminCheck, verifySession).all();

userRouter
	.route("/login")
	.post(credentialCheck, createToken, adminCheck, logIn)
	.all();

userRouter
	.route("/:userId")
	.get(authorization, ownAccount, getSingleUserByUserId)
	.put(authorization, ownAccount, doubleEmailUsernameCheck, updateUser)
	.delete(authorization, ownAccount, deleteUser)
	.all();

userRouter
	.route("/password/:userId")
	.put(authorization, ownAccount, encryptPassword, updateUser)
	.all();
