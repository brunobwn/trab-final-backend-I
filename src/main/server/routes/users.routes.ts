import { Router } from "express";
import { UserRepositoryTypeOrm } from "../../../app/features/users/repositories/UserRepositoryTypeOrm";
import UserController from "../../../app/features/users/controllers/UserController";

const usersRoutes = Router();

const usersRepo = new UserRepositoryTypeOrm();
const userController = new UserController(usersRepo);

usersRoutes.get('/:id?', (req, res) => userController.get(req,res));
usersRoutes.post('/', (req, res) => userController.create(req,res));
usersRoutes.patch('/:id?', (req, res) => userController.update(req,res));
usersRoutes.delete('/:id?', (req, res) => userController.delete(req,res));

export { usersRoutes, usersRepo };