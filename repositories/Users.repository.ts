import Repository from "./Repository";
import { IUser } from "../entities/user";

export class UsersRepository extends Repository<IUser> {
    async findAll(options): Promise<IUser[]> {
        return []
    }
}