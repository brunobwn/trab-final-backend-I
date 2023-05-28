import { IUserRepository } from './IUserRepository';
import { ConflictError } from "../../Helpers/api-errors";
import { dataSource } from "../../database/typeorm";
import { UserEntity } from "../../database/entities/user.entity";
import User from "../../Models/User";

class UserRepositoryTypeOrm implements IUserRepository {
    public repository = dataSource.getRepository(UserEntity);

    constructor() {
    }
    
    public async create(user:User) {
        const userExistente = await this.findByEmail(user.email);
        if(userExistente) {
            throw new ConflictError('Um usuário já está utilizando esse email!');
        }

        const entity = new UserEntity();
        entity.name = user.name;
        entity.email = user.email;
        entity.password = user.password;
        entity.role = user.role;
        entity.avatar = user.avatar;

        const savedUser = await this.repository.save(entity);
        return savedUser.id;
    }

    public async edit(user:User) {
        const entity = new UserEntity();
        entity.id = user.id;
        entity.name = user.name;
        entity.email = user.email;
        entity.password = user.password;
        entity.role = user.role;
        entity.avatar = user.avatar;
        entity.save();
        return this.repository.save(user);
    }

    public async find(id:string) {
        const entity = await this.repository.findOneBy({id});
        if(entity) {
            return new User({
                id:entity.id, 
                name:entity.name, 
                email:entity.email, 
                password:entity.password,
                role: entity.role,
                avatar: entity.avatar
            });
        }
        return null;
    }

    public async findByEmail(email:string) {
        const entity = await this.repository.findOneBy({email});
        if(entity) {
            return new User({
                id:entity.id, 
                name:entity.name, 
                email:entity.email, 
                password:entity.password,
                role: entity.role,
                avatar: entity.avatar
            });
        }
        return null;
    }

    public async findAll() {
        const usersEntities = await this.repository.find();
        return usersEntities.map(user => new User({
            id:user.id, 
            name:user.name, 
            email:user.email, 
            password:user.password,
            role: user.role,
            avatar: user.avatar
        }));
    }

    public async delete(id:string) {
        this.repository.delete({id});
    }
}

export { UserRepositoryTypeOrm }