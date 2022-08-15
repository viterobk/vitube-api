import { IProvider } from "./IProvider";

export class RepositoryBase<TRepositories> {
    constructor(repositoryProvider: IProvider<TRepositories>) {
        this._repositoryProvider = repositoryProvider;
    }

    private _repositoryProvider: IProvider<TRepositories>;

    protected getRepositories = () => this._repositoryProvider.data;
}