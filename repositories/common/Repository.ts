import { QueryResult } from "pg";
import { IRepositories } from ".";
import { RepositoryBase } from "@core";
import { dbAdapter } from '../../db';
import repositoryProvider from "./repositoryProvider";

export abstract class Repository extends RepositoryBase<IRepositories, QueryResult> {
    constructor() {
        super(repositoryProvider, dbAdapter);
    }
    protected getDBAdapter() {
        return this._dbAdapter;
    }
    protected getFieldsAndValues(obj: any, ...skipFields: string[]) {
        const fields = [];
        const values = [];
        Object.keys(obj).map((key) => {
            if(skipFields.includes(key)) return;
            fields.push(`"${key}"`);
            values.push(`'${obj[key]}'`);
        });
        return {
            fields,
            values,
        };
    }
}