import { Request, Response } from 'express';
import * as z from 'zod';
import User, { userSchema } from '../Models/User';
import ApiError from '../Helpers/ApiError';
import { UserRepository } from '../Repositories/UserRepository';

class UserController {
	constructor(private usersRepository:UserRepository) {}
	public async create(req: Request, res: Response): Promise<Response> {
		try {
			const { name, email, password, avatar } = userSchema.parse(req.body);

			const user = new User(name, email, password);
			if (avatar) {
				user.avatar = avatar;
			}

			this.usersRepository.create(user);
			console.log(this.usersRepository);
			return res.sendStatus(201).json(user);
		} catch (error) {
            console.log(error);
			if(error instanceof z.ZodError) {
				return res.status(400).json({ message: error.message });
			}
			return res.status(500).json({ message: 'Internal Server Error' });
        }
	}

	public async get(req: Request, res: Response): Promise<void> {
	}

	public async update(req: Request, res: Response): Promise<void> {
	}

	public async delete(req: Request, res: Response): Promise<void> {
	}
}

export default UserController;
