import express, { Request, Response } from 'express';
import 'express-async-errors';
import { usersRoutes } from './Routes/users.routes';
import { checkUserId } from './middlewares/checkUserId';
import { messagesRoutes } from './Routes/messages.routes';
import { authRoutes } from './Routes/auth.routes';
import { authMiddleware } from './middlewares/AuthMiddleware';
import cors from 'cors';
import { pgHelper } from './database/pg-helper';
import { requestLogger } from './middlewares/requestLogger';

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