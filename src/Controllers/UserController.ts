import { Request, Response } from 'express';
import * as z from 'zod';
import User, { userSchema } from '../Models/User';
import { usersDatabase } from '../server';

class UserController {
	public async createUser(req: Request, res: Response): Promise<void> {
		try {
			const { name, email, password, avatar } = userSchema.parse(req.body);

			const user = new User(name, email, password);
			if (avatar) {
				user.avatar = avatar;
			}

			usersDatabase.push(user);

			res.sendStatus(201).json(user);
		} catch (error: Error) {
			res.sendStatus(400).json({ error: error.message });
		}
	}
}

export default UserController;
