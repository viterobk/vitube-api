import { DBQuery, IDBAdapter, SendQueryFunc } from "./interfaces/IDBAdapter";
import { IProvider } from "./interfaces/IProvider";

export class RepositoryBase<TRepositories, TQueryResult> {
    constructor(repositoryProvider: IProvider<TRepositories>, dbAdapter: IDBAdapter<TQueryResult>) {
        this._repositoryProvider = repositoryProvider;
        this._dbAdapter = dbAdapter;
    }

    private _repositoryProvider: IProvider<TRepositories>;
    protected _dbAdapter: IDBAdapter<TQueryResult>;

    protected getRepositories = () => this._repositoryProvider.data;
    protected sendQuery = (query: DBQuery) => this._dbAdapter.sendQuery(query);
    protected useTransaction = (useTransactionFunc: (sendQuery: SendQueryFunc<TQueryResult>) => Promise<any>) => {
        return this._dbAdapter.useTransaction(useTransactionFunc);
    }
}