import { IRepositories } from ".";
import { RepositoryBase } from "../core/RepositoryBase";
import repositoryProvider from "./repositoryProvider";

export default class Repository<TEntity> extends RepositoryBase<TEntity, IRepositories> {
    constructor() {
        super(repositoryProvider);
    }
}