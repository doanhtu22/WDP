import express from "express";
import { AdminController } from "../controllers/index.js";

const adminRouter = express.Router();

// GET: /admins -> Get all admins
adminRouter.get("/", AdminController.getAdmins);

//GET: /admins/:id -> Get a single admin
adminRouter.get("/:id", AdminController.getAdminById);

// POST: /admins -> Create a new admin
adminRouter.post("/", AdminController.createAdmin);

adminRouter.post("/login", AdminController.loginAdmin);

// PUT: /admins/:id
adminRouter.put("/:id", AdminController.editAdmin);

// DELETE: /admins/:id
adminRouter.delete("/:id", AdminController.deleteAdmin);

export default adminRouter;
