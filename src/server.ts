import express from 'express';
import router from './routes';
import User from './Models/User';

const api = express();

api.use([express.json(), router]);

const userSeed = [new User('Bruno Berwian', 'brunoberwian@gmail.com', 'abc123', 'https://pps.whatsapp.net/v/t61.24694-24/306790408_527825505836062_7301371845119804315_n.jpg')];
export const usersDatabase: User[] = [...userSeed];

api.listen(8080, () => console.log('Server online em: http://localhost:8080'));

console.log(usersDatabase);

export default api;