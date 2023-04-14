import { Router } from "express";
import { MessageRepository } from "../Repositories/Message/MessageRepository";
import MessageController from "../Controllers/MessageController";

const messagesRoutes = Router({ mergeParams: true });

const messagesRepo = new MessageRepository();
const messageController = new MessageController(messagesRepo);

messagesRoutes.get('/', (req, res) => messageController.get(req,res));
messagesRoutes.post('/', (req, res) => messageController.create(req,res));
messagesRoutes.put('/', (req, res) => messageController.update(req,res));
messagesRoutes.delete('/', (req, res) => messageController.delete(req,res));

export { messagesRoutes };