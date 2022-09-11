import _ from 'lodash';
import uuid from 'uuid-v4';
import { Repository } from "./common";
import { IUser } from "../entities/user";

export class UsersRepository extends Repository {
    private _tableName = 'users';

    private getUser: (rawUser: any) => IUser = (rawUser) => _.pick(rawUser, ['id', 'email', 'name', 'role', 'authId']);

    async findAll(): Promise<IUser[]> {
        const { rows } = await this.sendQuery(`SELECT * FROM ${this._tableName}`);
        return rows.map(this.getUser);
    }
    async findById(id: string): Promise<IUser> {
        const { rows } = await this.sendQuery({
            text: `SELECT * FROM ${this._tableName} WHERE "id" = '$1'`,
            values: [id],
        });
        return this.getUser(rows[0]);
    }
    async create(data: IUser): Promise<IUser> {
        const { rows } = await this.sendQuery({
            text: `INSERT INTO ${this._tableName} ($columns) VALUES ($values)`,
            data,
        });
        return this.getUser(rows[0]);
    }
    async update(id: string, data: IUser) {
        const query = {
            text: `UPDATE ${this._tableName} SET ($columns) = ($values) WHERE "id" = $1`,
            data: _.omit(data, 'id'),
            values: [id],
        };
        const { rows } = await this.sendQuery(query);
        return this.getUser(rows[0]);
    }
    async delete(id: string): Promise<IUser> {
        const { rows } = await this.sendQuery({
            text: `DELETE FROM ${this._tableName} WHERE "id" = $1`,
            values: [id],
        });
        return this.getUser(rows[0]);
    }
}