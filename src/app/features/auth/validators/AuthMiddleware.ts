import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../../shared/helpers/api-errors';
import errorHandler from '../../../shared/middlewares/errorHandler';
import { usersRepo } from '../../../../main/server/routes/users.routes';

type JwtPayload = {
	id: string;
	name: string;
	email: string;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) {
			throw new UnauthorizedError('Não autorizado');
		}

		const token = authorization.split(' ')[1];

		jwt.verify(token, process.env.JWT_SECRET || 'MUDAR_SECRET', async (err, decode) => {
			if (err) {
				throw new UnauthorizedError('Não autorizado');
			}

			const { id } = decode as JwtPayload;

			const user = usersRepo.find(id);

			if (!user) {
				throw new UnauthorizedError('Não autorizado');
			}
		});

		next();
	} catch (err) {
		errorHandler(err, req, res);
	}
};
