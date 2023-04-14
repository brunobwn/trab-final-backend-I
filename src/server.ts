import express, { Request, Response } from 'express';
import 'express-async-errors';
import { usersRoutes } from './Routes/users.routes';
import { checkUserId } from './middlewares/checkUserId';
import { messagesRoutes } from './Routes/messages.routes';

const app = express();

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/user/:userId/messages', checkUserId, messagesRoutes);

app.listen(8080, () => console.log('Server online em: http://localhost:8080'));


export default app;