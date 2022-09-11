import _ from 'lodash';
import { Repository } from "./common";
import { IUserAuth } from '../entities/userAuth';

export class AuthRepository extends Repository {
    private _tableName = 'auth';

    private getUserAuth: (rawUserAuth: any) => IUserAuth = (rawUserAuth) => {
        return _.pick(rawUserAuth, [
            'id',
            'login',
            'passwordHash',
            'isAdmin',
            'refreshToken',
            'refreshTokenExp'
        ]);
    };

    async findByLogin(login): Promise<IUserAuth> {
        const result = await this.sendQuery({
            text: `SELECT * FROM ${this._tableName} WHERE UPPER("login") = UPPER($1)`,
            values: [login],
        });
        return result.rows.length ? this.getUserAuth(result.rows[0]) : undefined;
    }

    async findAll(): Promise<IUserAuth[]> {
        const result = await this.sendQuery(`SELECT * FROM ${this._tableName}`);
        return result.rows.map(this.getUserAuth);
    }
    async findById(id: string): Promise<IUserAuth> {
        const result = await this.sendQuery({
            text: `SELECT * FROM ${this._tableName} WHERE "id" = $1`,
            values: [id]
        });
        return this.getUserAuth(result.rows[0]);
    }
    async create(data: IUserAuth): Promise<IUserAuth> {
        const result = await this.sendQuery({
            text: `INSERT INTO ${this._tableName} ($columns) VALUES ($values) RETURNING *`, 
            data,
        });
        return this.getUserAuth(result[0]);
    }
    async update(id: string, data: IUserAuth) {
        const result = await this.sendQuery({
            text: `UPDATE ${this._tableName} SET ($columns) = ($values) WHERE "id" = $1 RETURNING *`,
            data: _.omit(data, 'id'),
            values: [id],
        });
        return this.getUserAuth(result.rows[0]);
    }
    async delete(id: string): Promise<IUserAuth> {
        const query = {
            text: `DELETE FROM ${this._tableName} WHERE "id" = $1 RETURNING *`,
            values: [id],
        }
        const result = this.sendQuery(query);
        return this.getUserAuth(result);
    }
}