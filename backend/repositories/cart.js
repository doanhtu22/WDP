import Cart from "../models/Cart.js";
// Create
const create = async ({ user, tour, quantity }) => {
  try {
    // Create new cart
    const newCart = await Cart.create({
      user,
      tour,
      quantity,
    });
    // Return newCart object
    return newCart._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};
// Get all carts
const list = async () => {
  try {
    return await Cart.find({}).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getById = async (id) => {
  try {
    return await Cart.findOne({ _id: id }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const edit = async (id, { user, tour, quantity }) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      { _id: id },
      {
        user,
        tour,
        quantity,
      },
      { new: true }
    );

    if (!updatedCart) {
      throw new Error("Cart not found");
    }

    return updatedCart;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteCart = async (id) => {
  try {
    return await Cart.findByIdAndDelete({ _id: id });
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default {
  create,
  list,
  getById,
  edit,
  deleteCart,
};
