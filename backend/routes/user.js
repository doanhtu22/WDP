import express from "express";
import { UserController } from "../controllers/index.js";

const userRouter = express.Router();

// GET: /users -> Get all users
userRouter.get("/", UserController.getUsers);

//GET: /users/:id -> Get a single user
userRouter.get("/:id", UserController.getUserById);

// POST: /users -> Create a new user
userRouter.post("/", UserController.createUser);

userRouter.post("/login", UserController.loginUser);

// PUT: /users/:id
userRouter.put("/:id", UserController.editUser);

// DELETE: /users/:id
userRouter.delete("/:id", UserController.deleteUser);

export default userRouter;
