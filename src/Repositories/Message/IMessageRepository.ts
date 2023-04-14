import Message from "../../Models/Message";

export interface IMessageRepository {
    messages: Message[];
    create: (user:Message) => void;
    edit: (user:Message) => void;
    find: (id:string) => Message | undefined;
    findAllByUser: (userId:string) => Message[];
}