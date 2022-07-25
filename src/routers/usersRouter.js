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

export const usersRouter = Router();

/**
 * @swagger
 * /users:
 *    get:
 *      description: This should return all users
 */
usersRouter
	.route("/")
	.get(authorization, adminCheck, getAllUsers)
	.post(encryptPassword, createUser) // The token will be created after creating user, because of the need of the userId
	.all();

/**
 * @swagger
 * /users:
 *    get:
 *      description: This should veify if a token is set and valid
 */
usersRouter.route("/auth").get(authorization, adminCheck, verifySession).all();

/**
 * @swagger
 * /users:
 *   get:
 *     description: This should allow login and return a token if the credentials are valid
 */
usersRouter
	.route("/login")
	.post(credentialCheck, createToken, adminCheck, logIn)
	.all();

usersRouter
	.route("/:userId")
	/**
	 * @swagger
	 * /users:
	 *    get:
	 *      description: This should return one user if authenticated and own account
	 */
	.get(authorization, ownAccount, getSingleUserByUserId)
	/**
	 * @swagger
	 * /users:
	 *    get:
	 *      description: This should update one user if authenticated and the own account
	 */
	.put(authorization, ownAccount, updateUser)
	/**
	 * @swagger
	 * /users:
	 *    get:
	 *      description: This should delete one user if authenticated and the own account
	 */
	.delete(authorization, ownAccount, deleteUser)
	.all();

usersRouter
	.route("/password/:userId")
	/**
	 * @swagger
	 * /users:
	 *    get:
	 *      description: This should allow to change the password if authenticated and onw account
	 */
	.put(authorization, ownAccount, encryptPassword, updateUser)
	.all();
