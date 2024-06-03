import express from "express";
import { CartController } from "../controllers/index.js";

const cartRouter = express.Router();

// GET: /carts -> Get all carts
cartRouter.get("/", CartController.getCarts);

// GET: /carts/:id -> Get cart by Id
cartRouter.get("/:id", CartController.getCartById);

// POST: /carts -> Create a new cart
cartRouter.post("/", CartController.createCart);

// PUT: /carts/:id
cartRouter.put("/:id", CartController.editCart);

// DELETE: /carts/:id
cartRouter.delete("/:id", CartController.deleteCart);

export default cartRouter;
