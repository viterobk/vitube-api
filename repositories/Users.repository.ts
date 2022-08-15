import Repository from "./Repository";
import { IUser } from "../entities/user";

export class UsersRepository extends Repository<IUser> {
    private _users: IUser[] = [];
    async findAll(options): Promise<IUser[]> {
        return [...this._users];
    }

    async findById(userId: number): Promise<IUser | undefined> {
        return this._users.find((u) => u.id === userId);
    }

    async create(user: IUser): Promise<IUser> {
        const id = this._users.length ? Math.max(...this._users.map((u) => u.id)) + 1 : 0;
        const userWithId = {
            ...user,
            id,
        }
        this._users.push(userWithId);
        return { ...userWithId };
    }

    async update(userId: number, user: IUser) {
        const index = this._users.findIndex((u) => u.id === userId);
        if (index < 0) throw Error(`User with "${userId}" id does not exist`);
        this._users[index] = {
            ...this._users[index],
            ...user,
            id: userId,
        }
        return { ...this._users[index] };
    }

    async delete(userId: number): Promise<IUser> {
        const index = this._users.findIndex((u) => u.id === userId);
        if (index < 0) throw Error(`User with "${userId}" id does not exist`);
        const item = { ...this._users[index] }
        this._users.splice(index, 1);
        return item;
    }
}