import User from "../models/User.js";
// Create
const create = async ({
  username,
  email,
  password,
  avatar,
  phone,
  dob,
  gender,
  address,
  cccd,
  favourite_tours,
  history_tours,
}) => {
  try {
    // Create new user
    const newUser = await User.create({
      username,
      email,
      password,
      avatar,
      phone,
      dob,
      gender,
      address,
      cccd,
      favourite_tours,
      history_tours,
    });
    // Return newUser object
    return newUser._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};
// Get all users
const list = async () => {
  try {
    return await User.find({}).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getById = async (id) => {
  try {
    return await User.findOne({ _id: id }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const loginUser = async (username) => {
  try {
    const user = await User.findOne({ username }).exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
const edit = async (
  id,
  {
    username,
    email,
    password,
    avatar,
    phone,
    dob,
    gender,
    address,
    cccd,
    favourite_tours,
    history_tours,
  }
) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        username,
        email,
        password,
        avatar,
        phone,
        dob,
        gender,
        address,
        cccd,
        favourite_tours,
        history_tours,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete({ _id: id });
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default {
  create,
  list,
  getById,
  edit,
  deleteUser,
  loginUser,
};
