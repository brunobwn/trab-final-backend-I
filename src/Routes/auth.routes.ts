import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post('/login', (req, res) => authController.login(req,res));

export { authRoutes };