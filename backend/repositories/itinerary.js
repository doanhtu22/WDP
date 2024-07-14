import Itinerary from "../models/itinerary.js";
// Create
const create = async ({ username, email, password, role }) => {
  try {
    // Create new itinerary
    const newItinerary = await Itinerary.create({
      username,
      email,
      password,
      role,
    });
    // Return newItinerary object
    return newItinerary._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};
// Get all itinerarys
const list = async () => {
  try {
    return await Itinerary.find({}).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getById = async (id) => {
  try {
    return await Itinerary.findOne({ _id: id }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const loginItinerary = async (username) => {
  try {
    const itinerary = await Itinerary.findOne({ username }).exec();
    return itinerary;
  } catch (error) {
    throw new Error(error);
  }
};
const edit = async (id, { username, email, password, avatar, role }) => {
  try {
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
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

    if (!updatedItinerary) {
      throw new Error("Itinerary not found");
    }

    return updatedItinerary;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteItinerary = async (id) => {
  try {
    return await Itinerary.findByIdAndDelete({ _id: id });
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default {
  create,
  list,
  getById,
  edit,
  deleteItinerary,
  loginItinerary,
};
