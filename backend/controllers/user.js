import { UserRepo } from "../repositories/index.js";
import { signAccessToken, signRefreshToken } from "../jwt_helper.js";
import createError from "http-errors";
// GET: /users
const getUsers = async (req, res) => {
  try {
    res.status(200).json(await UserRepo.list());
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
const getUserById = async (req, res) => {
  try {
    res.status(200).json(await UserRepo.getById(req.params.id));
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
// POST: /users
const createUser = async (req, res) => {
  try {
    // Get object from request body

    const {
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
    } = req.body;
    const newUser = await UserRepo.create({
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
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
// PUT: /users/1
const editUser = async (req, res) => {
  try {
    res.status(200).json(await UserRepo.edit(req.params.id, req.body));
  } catch (error) {
    res.status(500).json({});
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw createError.BadRequest(`Invalid Username/Password`);

    const existUser = await UserRepo.loginUser(username);
    if (!existUser) throw createError.NotFound("User not registered");

    if (password !== existUser.password)
      throw createError.Unauthorized(`Username/Password not valid`);

    const accessToken = await signAccessToken(existUser.id);
    const refreshToken = await signRefreshToken(existUser.id);
    res.send({ accessToken, refreshToken, existUser });
  } catch (error) {
    next(error);
  }
};
// DELETE: /users/1
const deleteUser = async (req, res) => {
  try {
    res.status(200).json(await UserRepo.deleteUser(req.params.id));
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
export default {
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  loginUser,
};
