import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UnauthorizedError } from '../Helpers/api-errors';
import { usersRepo } from '../Routes/users.routes';
import errorHandler from '../middlewares/errorHandler';

export class AuthController {
	async login(req: Request, res: Response) {
        try {
			const { email, password } = req.body;

            const user = usersRepo.findByEmail(email);
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
}