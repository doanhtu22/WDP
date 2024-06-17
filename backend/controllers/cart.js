import { CartRepo } from "../repositories/index.js";
// GET: /carts
const getCarts = async (req, res) => {
  try {
    res.status(200).json(await CartRepo.list());
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

// GET: /carts/1
const getCartById = async (req, res) => {
  try {
    res.status(200).json(await CartRepo.getById(req.params.id));
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

// POST: /carts
const createCart = async (req, res) => {
  try {
    // Get object from request body

    const { user, tour, quantity, startDate, startGate, payDate } = req.body;
    const newCart = await CartRepo.create({
      user,
      tour,
      quantity,
      startDate,
      startGate,
      payDate,
    });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

// PUT: /carts/1
const editCart = async (req, res) => {
  try {
    res.status(200).json(await CartRepo.edit(req.params.id, req.body));
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

// DELETE: /carts/1
const deleteCart = async (req, res) => {
  try {
    res.status(200).json(await CartRepo.deleteCart(req.params.id));
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

export default {
  getCarts,
  getCartById,
  createCart,
  editCart,
  deleteCart,
};
