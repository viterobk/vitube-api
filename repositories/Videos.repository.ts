import _ from 'lodash';
import uuid from 'uuid-v4';
import { Repository } from "./common";
import { IVideo } from "../entities/video";

export class VideosRepository extends Repository {
    private _tableName = 'videos';

    private getVideo: (rawUser: any) => IVideo = (rawVideo) => _.pick(rawVideo, ['id', 'userid', 'url', 'name', 'description', 'tags']);

    async findAll(): Promise<IVideo[]> {
        const { rows } = await this.sendQuery(`SELECT * FROM ${this._tableName}`);
        return rows.map(this.getVideo);
    }
    async findById(id: string): Promise<IVideo> {
        const query = {
            text: `SELECT * FROM $1 WHERE "id" = '$2'`,
            values: [this._tableName, id],
        }
        const { rows } = await this.sendQuery(query);
        return this.getVideo(rows[0]);
    }
    async create(data: IVideo): Promise<IVideo> {
        const completeData = {
            ...data,
            id: uuid(),
        }
        const { fields, values } = this.getFieldsAndValues(completeData)
        const query = {
            text: `INSERT INTO $1 ($2) VALUES ($3)`,
            values: [this._tableName, fields.join(','), values.join(',')],
        }
        const { rows } = await this.sendQuery(query);
        return this.getVideo(rows[0]);
    }
    async update(id: string, data: IVideo) {
        const { fields, values } = this.getFieldsAndValues(data, 'id');
        const query = {
            text: `UPDATE $1 SET ($2) = ($3) WHERE "id" = $4`,
            data: [this._tableName, fields.join(','), values.join(','), id],
        }
        const { rows } = await this.sendQuery(query);
        return this.getVideo(rows[0]);
    }
    async delete(id: string): Promise<IVideo> {
        const query = {
            text: `DELETE FROM $1 WHERE "id" = '$2'`,
            data: [this._tableName, id],
        }
        const { rows } = await this.sendQuery(query);
        return this.getVideo(rows[0]);
    }
}