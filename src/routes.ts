import { Router } from "express";

const router = Router();

router.get('/', function(req,res) { return res.sendStatus(200)});
// router.get('/users/:id', new UserController().find);
// router.post('/users', cpfValidator, new UserController().create);
// router.put('/users/:id', new UserController().update);
// router.delete('/users/:id', new UserController().delete);

export default router;