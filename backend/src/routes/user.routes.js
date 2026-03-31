//Connects incoming request to correct logic

import { Router } from "express";
import { registerUser,  loginUser } from "../controllers/user.controller.js";

const router = Router();

// define route
router.post("/register", registerUser);
router.post("/login", loginUser)

export default router;