import { AdminRepo } from "../repositories/index.js";
import { signAccessToken, signRefreshToken } from "../jwt_helper.js";
import createError from "http-errors";
// GET: /admins
const getAdmins = async (req, res) => {
  try {
    res.status(200).json(await AdminRepo.list());
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
const getAdminById = async (req, res) => {
  try {
    res.status(200).json(await AdminRepo.getById(req.params.id));
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
// POST: /admins
const createAdmin = async (req, res) => {
  try {
    // Get object from request body

    const { username, email, password, avatar, role } = req.body;
    const newUser = await AdminRepo.create({
      username,
      email,
      password,
      avatar,
      role,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
// PUT: /admins/1
const editAdmin = async (req, res) => {
  try {
    res.status(200).json(await AdminRepo.edit(req.params.id, req.body));
  } catch (error) {
    res.status(500).json({});
  }
};
const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw createError.BadRequest(`Invalid Username/Password`);

    const existAdmin = await AdminRepo.loginAdmin(username);
    if (!existAdmin) throw createError.NotFound("User not registered");

    if (password !== existAdmin.password)
      throw createError.Unauthorized(`Username/Password not valid`);

    const accessToken = await signAccessToken(existAdmin.id);
    const refreshToken = await signRefreshToken(existAdmin.id);
    res.send({ accessToken, refreshToken, existAdmin });
  } catch (error) {
    next(error);
  }
};
// DELETE: /admins/1
const deleteAdmin = async (req, res) => {
  try {
    res.status(200).json(await AdminRepo.deleteAdmin(req.params.id));
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
export default {
  getAdmins,
  getAdminById,
  createAdmin,
  editAdmin,
  deleteAdmin,
  loginAdmin,
};
