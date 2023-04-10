import { Router } from "express";
import UserController from "../Controllers/UserController";
import { usersRepository } from "../server";

const usersRoutes = Router();

const userController = new UserController(usersRepository);

usersRoutes.get('/:id', userController.get);
usersRoutes.post('/create', userController.create);
usersRoutes.put('/:id', userController.update);
usersRoutes.delete('/:id', userController.delete);

export { usersRoutes };