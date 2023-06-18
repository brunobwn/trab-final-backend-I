import { pgHelper } from '../config/pg-helper';
import express from 'express';
import 'express-async-errors';
import { authRoutes } from './routes/auth.routes';
import { authMiddleware } from '../../app/features/auth/validators/AuthMiddleware';
import cors from 'cors';
import { requestLogger } from '../../app/shared/middlewares/requestLogger';
import { usersRoutes } from './routes/users.routes';
import { checkUserId } from '../../app/features/users/validators/checkUserId';
import { messagesRoutes } from './routes/messages.routes';

const app = express();

app.use([express.json(), cors(), requestLogger]);

// Rotas Publicas
app.use('/auth', authRoutes);

// Rotas Privadas
app.use('/users', authMiddleware, usersRoutes);
app.use('/user/:userId/messages', authMiddleware, checkUserId, messagesRoutes);

pgHelper.connect()
    .then(() => {
        app.listen(8080, () => console.log('Server online em: http://localhost:8080'));
    }).catch(err => console.log(err));


export default app;