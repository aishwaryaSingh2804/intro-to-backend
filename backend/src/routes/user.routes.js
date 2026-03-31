//Connects incoming request to correct logic

import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

// define route
router.post("/register", registerUser);
export default router;