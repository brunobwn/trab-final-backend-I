import express, { Request, Response } from 'express';
import 'express-async-errors';
import { usersRoutes } from './Routes/users.routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/users', usersRoutes);

app.listen(8080, () => console.log('Server online em: http://localhost:8080'));


export default app;