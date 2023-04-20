import User from "../../Models/User";

export interface IUserRepository {
    users: User[];
    create: (user:User) => void;
    edit: (user:User) => void;
    find: (id:string) => User | undefined;
    findByEmail: (email:string) => User | undefined;
    findAll: () => User[];
    delete: (id:string) => boolean;
}