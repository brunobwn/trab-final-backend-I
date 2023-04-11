import crypto from 'crypto';
import * as z from 'zod';

export const userSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
	email: z.string().email({ message: 'E-mail inválido' }),
	password: z
		.string()
		.min(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
		.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
			message: 'Senha inválida. Deve conter letras e números.',
		}),
	avatar: z
		.string()
		.url({ message: 'Avatar deve ter uma URL válida' })
		.optional()
        .nullable(),
});

type UserSchema = z.infer<typeof userSchema>;
interface UserResource extends Omit<UserSchema, 'password'>  {
	id:string,
	role: 'admin' | 'user';
}

type UserConstructorType ={
	name: string;
	email: string;
	password: string;
	avatar: string | null;
	role?: 'admin' | 'user';
}
class User {
    private _id:string = crypto.randomUUID();
	private _name: string | undefined;
	private _email: string | undefined;
	private _password: string | undefined;
	private _avatar: string | null;
	private _role: 'admin' | 'user';

	constructor({name, email, password, avatar = null,role = 'user'}:UserConstructorType) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.avatar = avatar;

		if(role !== 'admin' && role !== 'user') throw new Error('Tipo de usuário inválido!');
		this._role = role;
	}

	setPassword(password: string): void {
		const salt = crypto.randomBytes(16).toString('hex');
		const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
		this._password = `${salt}:${hash}`;
	}

	checkPassword(password: string): boolean {
        if(this._password) {
            const [salt, hash] = this._password.split(':');
            const testHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
            return hash === testHash;
        }
        return false;
	}

	validate(): UserSchema {
		const user = {
			name: this._name,
			email: this._email,
			password: this._password,
			avatar: this._avatar,
		};
		return userSchema.parse(user);
	}

	toObject(): UserResource {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			avatar: this.avatar,
			role: this._role,
		}
	}

	get is_admin(): boolean {
		return this._role === 'admin';
	}

	get is_user(): boolean {
		return this._role === 'user';
	}

	set role(role: 'admin' | 'user') {
		this._role = role;
	}
    
    get id(): string {
        return this._id;
    }

	get name(): string {
		return this._name;
	}

	set name(name: string) {
		const nameSchema = userSchema.pick({ name: true });
		nameSchema.parse({ name }); 
		this._name = name;
	}

	get email(): string{
		return this._email!;
	}

	set email(email: string) {
		const emailSchema = userSchema.pick({ email: true });
		emailSchema.parse({ email }); 
		this._email = email;
	}

	set password(password: string) {
		const passwordSchema = userSchema.pick({ password: true });
		passwordSchema.parse({ password }); 
		this.setPassword(password);
	}

	get avatar(): string | null {
		return this._avatar;
	}

	set avatar(avatar: string | null) {
        const avatarSchema = userSchema.pick({ avatar: true });
		avatarSchema.parse({ avatar }); 
		this._avatar = avatar;
	}
}

export default User;
