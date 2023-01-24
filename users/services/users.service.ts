import { CRUD } from "../../common/interfaces/crud.interface";
import usersDao from "../daos/users.dao";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";

class UsersService implements CRUD {
    async create (resource: CreateUserDto) {
        return usersDao.AddUser(resource);
    }

    async list (limit: number, page: number) {
        return usersDao.getUsers(limit, page);
    }

    async patchById (id: string, resource: PatchUserDto): Promise<any> {
        return usersDao.updateUserById(id, resource);
    }

    async readById (id: string) {
        return usersDao.getUserById(id);
    }

    async putById (id: string, resource: PutUserDto): Promise<any> {
        return usersDao.updateUserById(id, resource);
    }
    
    async deleteById (id:string): Promise<any> {
        return usersDao.removeUserById(id);
    }

    async getUserByEmail (email: string) {
        return usersDao.getUserByEmail(email);
    }

    async getUserByEmailWithPassword(email: String) {
        return usersDao.getUserByEmailWithPassword(email);
    }
}

export default new UsersService();