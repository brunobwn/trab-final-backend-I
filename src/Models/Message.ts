import crypto from 'crypto';

class Message {
    public id:string;
    constructor(userId: string, subject: string, text:string) {
        this.id = crypto.randomUUID();
    }
}

export default Message;