import crypto from 'crypto';

export type Usesr = {
	id: string;
	name: string;
	email: string;
	password: string;
	avatar?: string;
};

class User {
    private id:string;
    private salt:string;
    private hash:string;

    constructor(name: string, email: string, _password:string, avatar?:string) {
        this.id = crypto.randomUUID();
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(_password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    }

    setPassword(newPassword:string) {
        this.hash = crypto.pbkdf2Sync(newPassword, this.salt, 1000, 64, `sha512`).toString(`hex`);
    }
}

export default User;