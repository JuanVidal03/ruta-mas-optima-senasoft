import { Router } from "express";
import { register, login,logout, veriFyToken } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/verify-token", veriFyToken);

export default authRoutes;
