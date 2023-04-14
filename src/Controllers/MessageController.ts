import {  Request, Response } from 'express';
import errorHandler from '../middlewares/errorHandler';
import { BadRequestError, NotFoundError } from '../Helpers/api-errors';
import { IMessageRepository } from '../Repositories/Message/IMessageRepository';
import Message, { messageSchema } from '../Models/Message';

class MessageController {
	private repository: IMessageRepository;

	constructor(repository:IMessageRepository) {
		this.repository = repository;
	}

	async create(req: Request, res: Response) {
		try {
			const { subject, text } = req.body;
			const message = new Message({userId:req.params.userId, subject, text});
			this.repository.create(message);
			return res.status(201).json(message.toObject());
		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async get(req: Request, res: Response) {
		try {
			const messages = this.repository.getAllByUser(req.params.userId);
			return res.json(messages.map(message => message.toObject()));

		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async update(req: Request, res: Response) {
		try {
			if(!req.params.id) {
				throw new BadRequestError('Obrigatório informar o ID do usuário!');
			}

			const user = this.repository.find(req.params.id);
			if(!user) {
				throw new NotFoundError('Usuário não encontrado');
			}

			for (const [key, value] of Object.entries(req.body)) {
				switch (key) {
				  case 'name':
					user.name = value as string;
					break;
				  case 'email':
					user.email = value as string;
					break;
				  case 'password':
					user.password = value as string;
					break;
				  case 'avatar':
					user.avatar = value as string;
					break;
				  case 'role':
					// TODO: Check if auth user is admin
					user.role = value as 'admin' | 'user';
					break;
				  default:
					throw new BadRequestError(`Propriedade inválida: ${key}`);
				}
			}

			this.repository.edit(user);
			return res.sendStatus(204);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async delete(req: Request, res: Response) {
		try {
			if(!req.params.id) {
				throw new BadRequestError('Obrigatório informar o ID do usuário!');
			}
			const userDeleted = this.repository.delete(req.params.id);
			if(!userDeleted) {
				throw new NotFoundError('Usuário não encontrado');
			}
			return res.sendStatus(204);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}
}

export default MessageController;
