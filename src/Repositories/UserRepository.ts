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

    public all(): User[] {
        return this.users
    };
    
    public create(user:User): void {
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