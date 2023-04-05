import express from 'express';
import router from './routes';

const api = express();

api.use([express.json(), router]);

api.listen(8080, () => console.log('Server online em: http://localhost:8080'));

export default api;