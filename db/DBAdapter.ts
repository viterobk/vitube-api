import config from 'config';
import { Pool, PoolClient, QueryResult } from 'pg';
import { DBQuery, IDBAdapter, SendQueryFunc } from "@core/interfaces";

const PLACEHOLDER_VALUES = '$values';
const PLACEHOLDER_COLUMNS = '$columns';

const { user, password, database, host } = config.db;
const pool = new Pool({
    host,
    user,
    max: 10,
    password,
    database,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 30000,
})

export class DBAdapter implements IDBAdapter<QueryResult> {
    public async useClient (useClientFunc: (client: PoolClient) => any): Promise<any> {
        const client = await pool.connect();
        let error;
        let result;
        try {
            result = useClientFunc(client);
        } catch (e) {
            error = e;
        } finally {
            client.release()
        }
        if(error) {
            throw Error(error);
        }
        return result;
    }

    private async query (client: PoolClient, query: DBQuery): Promise<QueryResult> {
        if (typeof query === 'string') {
            return await client.query(query);
        }
        const { text, data, values } = query;
        const notEmptyData = data ?? {};
        const notEmptyValues = values ?? [];
        const isArrayData = Array.isArray(notEmptyData);
        const dataValues = isArrayData ? notEmptyData as string[]: Object.values(notEmptyData);
        const queryValues = [
            ...notEmptyValues,
            ...dataValues,
        ];
        const columns = isArrayData ? [] : Object.keys(notEmptyData);

        const valuesLength = notEmptyValues.length;
        const valuesPlaceholders = dataValues?.map((v, i) => `$${i + valuesLength + 1}`).join(',');
        const columnsText = columns?.map((c) => `"${c}"`).join(',');
        const queryText = text
            .replace(PLACEHOLDER_VALUES, valuesPlaceholders)
            .replace(PLACEHOLDER_COLUMNS, columnsText);

        return await client.query(queryText, queryValues);
    };

    public async useTransaction<TResult> (useTransactionFunc: (sendQuery: SendQueryFunc<QueryResult>) => TResult): Promise<TResult> {
        return await this.useClient(async (client) => {
            await client.query('BEGIN');
            const result = await useTransactionFunc(async (query) => await this.query(client, query));
            await client.query('COMMIT');
            return result;
        })
    }
    public async sendQuery (query: DBQuery): Promise<QueryResult> {
        return await this.useClient(async (client) => {
            return await this.query(client, query);
        });
    };
}
export default new DBAdapter();