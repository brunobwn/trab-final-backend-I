import { Repository } from "typeorm";
import { MessageEntity } from "../../../../main/database/entities/messages.entity";
import Message from "../../../models/Message";

export interface IMessageRepository {
    repository: Repository<MessageEntity>;
    create: (message:Message) => Promise<string>;
    edit: (message:Message) => void;
    find: (id:string) => Promise<Message | null>;
    getAllByUser: (userId:string) => Promise<Message[]>;
    delete: (id:string) => Promise<void>;
}