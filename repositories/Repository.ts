import { IRepositories } from ".";
import { RepositoryBase } from "../core/RepositoryBase";
import { IEntity } from '../core/interfaces';
import repositoryProvider from "./repositoryProvider";

export default class Repository<TEntity extends IEntity> extends RepositoryBase<IRepositories> {
    constructor() {
        super(repositoryProvider);
    }

    private _entities: TEntity[] = [];

    async findAll(): Promise<TEntity[]> {
        return [...this._entities];
    }

    async findById(id: number): Promise<TEntity | undefined> {
        const entity = this._entities.find((u) => u.id === id);
        return entity ? { ...entity } : undefined;
    }

    async create(data: TEntity): Promise<TEntity> {
        const id = this._entities.length ? Math.max(...this._entities.map((u) => u.id)) + 1 : 0;
        const dataWithId = {
            ...data,
            id,
        }
        this._entities.push(dataWithId);
        return { ...dataWithId };
    }

    async update(id: number, data: TEntity) {
        const index = this._entities.findIndex((u) => u.id === id);
        if (index < 0) throw Error(`User with "${id}" id does not exist`);
        this._entities[index] = {
            ...this._entities[index],
            ...data,
            id,
        }
        return { ...this._entities[index] };
    }

    async delete(id: number): Promise<TEntity> {
        const index = this._entities.findIndex((u) => u.id === id);
        if (index < 0) throw Error(`User with "${id}" id does not exist`);
        const item = { ...this._entities[index] }
        this._entities.splice(index, 1);
        return item;
    }
}