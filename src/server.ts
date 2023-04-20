import express, { Request, Response } from 'express';
import 'express-async-errors';
import { usersRoutes } from './Routes/users.routes';
import { checkUserId } from './middlewares/checkUserId';
import { messagesRoutes } from './Routes/messages.routes';
import { authRoutes } from './Routes/auth.routes';
import { authMiddleware } from './middlewares/AuthMiddleware';

const app = express();

app.use(express.json());

// Rotas Publicas
app.use('/auth', authRoutes);

// Rotas Privadas
app.use('/users', authMiddleware, usersRoutes);
app.use('/user/:userId/messages', authMiddleware, checkUserId, messagesRoutes);

app.listen(8080, () => console.log('Server online em: http://localhost:8080'));


export default app;