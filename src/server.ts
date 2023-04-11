import { UserRepository } from './Repositories/UserRepository';
import express from 'express';
import { usersRoutes } from './Routes/users.routes';
import User from './Models/User';

const api = express();

api.use([express.json()]);

api.use('/users', usersRoutes);

api.listen(8080, () => console.log('Server online em: http://localhost:8080'));


export default api;