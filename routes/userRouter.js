import express from "express";
import {
  register,
  login,
  logout,
  getUser,
} from "../controllers/userController.js";
import { isAuthorized } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getuser", getUser);

export default router;
