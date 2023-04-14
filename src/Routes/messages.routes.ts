import { Router } from "express";
import UserController from "../Controllers/UserController";
import { UserRepository } from "../Repositories/User/UserRepository";

const usersRoutes = Router();

const usersRepo = new UserRepository();
const userController = new UserController(usersRepo);

usersRoutes.get('/:id?', (req, res) => userController.get(req,res));
usersRoutes.post('/', (req, res) => userController.create(req,res));
usersRoutes.put('/:id', (req, res) => userController.update(req,res));
usersRoutes.delete('/:id', (req, res) => userController.delete(req,res));

export { usersRoutes };