import crypto from 'crypto';
import * as z from 'zod';

export const messageSchema = z.object({
	userId: z.string().uuid(),
	subject: z.string(),
	text: z.string(),
});

type MessageSchema = z.infer<typeof messageSchema>;

export interface MessageResource extends MessageSchema  {
	id:string,
    is_active: boolean;
    created_at: Date;
    edited_at: Date;
}

class Message {

    private _id:string = crypto.randomUUID();
    private _userId:string = '';
    private _subject:string = '';
    private _text:string = '';
    private _is_active:boolean = true;
    private _created_at:Date = new Date();
    private _edited_at:Date = new Date();

    constructor({userId, subject, text}:MessageSchema) {
        this.userId = userId;
        this.subject = subject;
        this.text = text;
    }

    updateEditedAt() {
        this._edited_at = new Date();
    }

    toObject(): MessageResource {
		return {
			id: this.id,
			userId: this.userId,
			subject: this.subject,
			text: this.text,
            is_active: this._is_active,
			created_at: this._created_at,
            edited_at: this._edited_at,
		}
	}

    get id() {
        return this._id;
    }

    set userId(userId:string) {
        const userIdSchema = messageSchema.pick({ userId: true });
		userIdSchema.parse({ userId });
        this.updateEditedAt();
        this._userId = userId;
    }

    get userId(){
        return this._userId;
    }

    set subject(subject:string) {
        const subjectSchema = messageSchema.pick({ subject: true });
		subjectSchema.parse({ subject });
        this.updateEditedAt();
        this._subject = subject;
    }
    
    get subject(){
        return this._subject;
    }

    set text(text:string) {
        const textSchema = messageSchema.pick({ text: true });
		textSchema.parse({ text });
        this.updateEditedAt();
        this._text = text;
    }

    get text(){
        return this._text;
    }

    set is_active(is_active:boolean) {
        if(typeof is_active !== 'boolean') {
            throw new Error('is_active must be a boolean');
        }
        this.updateEditedAt();
        this._is_active = is_active;
    }

    get is_active(){
        return this._is_active;
    }

    get created_at(){
        return this._created_at;
    }

    get edited_at(){
        return this._edited_at;
    }
}

export default Message;