import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UnauthorizedError } from '../../../shared/helpers/api-errors';
import errorHandler from '../../../shared/middlewares/errorHandler';
import { ConflictError } from '../../../shared/helpers/api-errors';
import { usersRepo } from '../../../../main/server/routes/users.routes';
import User, { userSchema } from '../../../models/User';

export class AuthController {
	async login(req: Request, res: Response) {
        try {
			const { email, password } = req.body;

            const user = await usersRepo.findByEmail(email);
            if (!user) {
                throw new UnauthorizedError('E-mail ou senha inválidos');
            }

            if (!user.checkPassword(password)) {
                throw new UnauthorizedError('E-mail ou senha inválidos');
            }
            const payload = { id: user.id, name: user.name, email: user.email };
            const token = jwt.sign(payload, process.env.JWT_SECRET || 'MUDAR_SECRET', {
                expiresIn: '1d',
            });

            return res.status(200).json({ user: user.toObject(), token });

		} catch (err) {
			errorHandler(err, req, res);
		}
	}

    async register(req: Request, res: Response) {
        try {
			const { name, email, password, avatar } = userSchema.parse(req.body);

            const existsUser = await usersRepo.findByEmail(email);
            if (existsUser) {
                throw new ConflictError('E-mail já cadastrado');
            }
			const user = new User({name, email, password, avatar});
			user.id = await usersRepo.create(user);
            
            const token = jwt.sign(user.toObject(), process.env.JWT_SECRET || 'MUDAR_SECRET', {
                expiresIn: '1d',
            });

            return res.status(201).json({ user: user.toObject(), token });
		} catch (err) {
			errorHandler(err, req, res);
		}
    }
}
