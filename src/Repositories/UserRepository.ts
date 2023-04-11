import { ConflictError } from "../Helpers/api-errors";
import User from "../Models/User";
interface IUserRepository {
    users: User[];
    create: (user:User) => void;
    edit: (user:User) => void;
    find: (id:string) => User | undefined;
    all: () => User[];
}

class UserRepository implements IUserRepository{
    public users: User[] = [];

    constructor() {
        this.seed();
    }

    private seed(): void {
        const usuariosSeed = [
            new User('Bruno Berwian', 'brunoberwian@gmail.com', 'abc123', 'https://pps.whatsapp.net/v/t61.24694-24/306790408_527825505836062_7301371845119804315_n.jpg')
        ];
        usuariosSeed.forEach(u => this.create(u));
    }

    public all(): User[] {
        return this.users
    };
    
    public create(user:User): void {
        const userExistente = this.users.find(u => u.email === user.email);
        if(userExistente) {
            throw new ConflictError('Um usuário já está utilizando esse email!');
        }
        this.users.push(user);
    }

    public edit(user: User): void {
        const currentIndex = this.users.map(e => e.id).indexOf(user.id);
        this.users.splice(currentIndex, 1, user);
    }

    public find(id:string): User | undefined {
        return this.users.find(user => user.id === id);
    }
}

export { UserRepository, IUserRepository }