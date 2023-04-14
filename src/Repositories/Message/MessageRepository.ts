import Message from "../../Models/Message";
import { IMessageRepository } from "./IMessageRepository";

class MessageRepository implements IMessageRepository{
    public messages: Message[] = [];

    constructor() {
        this.seed();
    }

    private seed(): void {
    }
    
    public create(user:Message): void {
        this.messages.push(user);
    }

    public edit(message: Message): void {
        const currentIndex = this.messages.map(e => e.id).indexOf(message.id);
        this.messages.splice(currentIndex, 1, message);
    }

    public find(id:string) {
        return this.messages.find(message => message.id === id);
    }

    public findAllByUser(userId:string): Message[] {
        return this.messages.filter(message => message.userId === userId) ?? [];
    }
}

export { MessageRepository }