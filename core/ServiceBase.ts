import { IProvider } from "./interfaces";

export class ServiceBase<TServices, TRepositories> {
    constructor(serviceProvider: IProvider<TServices>, repositoryProvider: IProvider<TRepositories>) {
        this._serviceProvider = serviceProvider;
        this._repositoryProvider = repositoryProvider;
    }

    private _serviceProvider: IProvider<TServices>;
    private _repositoryProvider: IProvider<TRepositories>;

    protected getRepositories = () => this._repositoryProvider.data;
    protected getServices = () => this._serviceProvider.data;
}