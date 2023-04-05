import crypto from 'crypto';
import * as z from 'zod';

export const userSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
		.regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, {
			message: 'Nome inválido',
		}),
	email: z.string().email({ message: 'E-mail inválido' }),
	password: z
		.string()
		.min(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
		.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
			message: 'Senha inválida. Deve conter letras e números.',
		}),
	avatar: z
		.string()
		.url({ message: 'Avatar deve ser uma URL válida' })
		.regex(/\.(jpeg|jpg|gif|png)$/, {
			message: 'Avatar deve ser um arquivo de imagem válido',
		})
        .optional(),
});

type UserSchema = z.infer<typeof userSchema>;

class User {
    private _id:string = crypto.randomUUID();
	private _name: string;
	private _email: string | undefined;
	private _password: string | undefined;
	private _avatar?: string;

	constructor(name: string, email: string, password: string, avatar?: string) {
		this._name = name;
		this.email = email;
		this.password = password;
		this._avatar = avatar;
	}

	public setPassword(password: string): void {
		const salt = crypto.randomBytes(16).toString('hex');
		const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
		this._password = `${salt}:${hash}`;
	}

	public checkPassword(password: string): boolean {
        if(this._password) {
            const [salt, hash] = this._password.split(':');
            const testHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
            return hash === testHash;
        }
        return false;
	}

	public validate(): UserSchema {
		const user = {
			name: this._name,
			email: this._email,
			password: this._password,
			avatar: this._avatar,
		};
		return userSchema.parse(user);
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
		return this._email ?? '';
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

	get avatar(): string | undefined {
		return this._avatar;
	}

	set avatar(avatar: string | undefined) {
        const avatarSchema = userSchema.pick({ avatar: true });
		avatarSchema.parse({ avatar }); 
		this._avatar = avatar;
	}
}

export default User;
