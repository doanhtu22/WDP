import Admin from "../models/Admin.js";
// Create
const create = async ({ username, email, password, avatar, role }) => {
  try {
    // Create new admin
    const newAdmin = await Admin.create({
      username,
      email,
      password,
      avatar,
      role,
    });
    // Return newAdmin object
    return newAdmin._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};
// Get all admins
const list = async () => {
  try {
    return await Admin.find({}).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getById = async (id) => {
  try {
    return await Admin.findOne({ _id: id }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const loginAdmin = async (username) => {
  try {
    const admin = await Admin.findOne({ username }).exec();
    return admin;
  } catch (error) {
    throw new Error(error);
  }
};
const edit = async (id, { username, email, password, avatar, role }) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      { _id: id },
      {
        username,
        email,
        password,
        avatar,
        role,
      },
      { new: true }
    );

    if (!updatedAdmin) {
      throw new Error("Admin not found");
    }

    return updatedAdmin;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteAdmin = async (id) => {
  try {
    return await Admin.findByIdAndDelete({ _id: id });
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default {
  create,
  list,
  getById,
  edit,
  deleteAdmin,
  loginAdmin,
};
