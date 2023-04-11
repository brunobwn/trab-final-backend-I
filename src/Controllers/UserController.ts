import {  Request, Response } from 'express';
import User, { userSchema } from '../Models/User';
import { UserRepository } from '../Repositories/UserRepository';
import errorHandler from '../middlewares/errorHandler';

class UserController {
	private repository = new UserRepository();

	async create(req: Request, res: Response) {
		try {
			const { name, email, password, avatar } = userSchema.parse(req.body);

			const user = new User(name, email, password);
			if (avatar) {
				user.avatar = avatar;
			}
			console.log(this.repository);

			this.repository.create(user);
			return res.status(201).json(user.toObject());
		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	get(req: Request, res: Response) {
		try {
			const { name, email, password, avatar } = userSchema.parse(req.body);

			const user = new User(name, email, password);
			if (avatar) {
				user.avatar = avatar;
			}
			console.log(this.repository);

			this.repository.create(user);
			return res.status(201).json(user);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	update(req: Request, res: Response) {}

	delete(req: Request, res: Response) {}
}

export default UserController;
