export type DBQuery = string | {
    text: string;
    data?: string[] | Record<string, any>;
    values?: string[]
}
export type SendQueryFunc<TQueryResult> = (query: DBQuery) => Promise<TQueryResult>

export interface IDBAdapter<TQueryResult> {
    useTransaction: <TResult>(useTransactionFunc: (sendQuery: SendQueryFunc<TQueryResult>) => TResult) => Promise<TResult>;
    sendQuery: SendQueryFunc<TQueryResult>;
}