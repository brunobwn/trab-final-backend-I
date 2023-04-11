import {  Request, Response } from 'express';
import User, { userSchema } from '../Models/User';
import { IUserRepository, UserRepository } from '../Repositories/UserRepository';
import errorHandler from '../middlewares/errorHandler';
import { NotFoundError } from '../Helpers/api-errors';

class UserController {
	private repository: IUserRepository;

	constructor(repository:IUserRepository) {
		this.repository = repository;
	}

	async create(req: Request, res: Response) {
		try {
			const { name, email, password, avatar } = userSchema.parse(req.body);

			const user = new User({name, email, password, avatar: avatar ?? null});

			this.repository.create(user);
			return res.status(201).json(user.toObject());
		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async get(req: Request, res: Response) {
		try {
			if(req.params.id) {
				const user = this.repository.find(req.params.id);
				if(!user) throw new NotFoundError('Usuário não encontrado');
				return res.json(user.toObject());
			}

			const users = this.repository.findAll();
			return res.json(users.map(user => user.toObject()));

		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async update(req: Request, res: Response) {}

	async delete(req: Request, res: Response) {}
}

export default UserController;
