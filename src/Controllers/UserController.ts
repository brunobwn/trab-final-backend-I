import { Request, Response } from 'express';
import * as z from 'zod';
import User, { userSchema } from '../Models/User';
import { UserRepository } from '../Repositories/UserRepository';

class UserController {
	private repository = new UserRepository();

	public async create(req: Request, res: Response) {
		try {
			const { name, email, password, avatar } = userSchema.parse(req.body);

			const user = new User(name, email, password);
			if (avatar) {
				user.avatar = avatar;
			}
			console.log(this.repository);

			this.repository.create(user);
			return res.status(201).json(user);
		} catch (error) {
            console.log(error);
			if(error instanceof z.ZodError) {
				return res.status(400).json({ message: error.issues });
			}
			if(error instanceof Error) {
				return res.status(400).json({ message: error.message });
			}
			return res.status(500).json({ message: 'Internal server error'  });
        }
	}

	public async get(req: Request, res: Response) {
	}

	public async update(req: Request, res: Response): Promise<void> {
	}

	public async delete(req: Request, res: Response): Promise<void> {
	}
}

export default UserController;
