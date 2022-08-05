import { IRepositories } from "../repositories";
import { IServices } from "../services";

export interface IExecutionContext {
    repositories: IRepositories;
    services: IServices;
}

export interface ArgumentsBase {
    executionContext: IExecutionContext;
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export interface IRouteOptions {
    method: HttpMethod;
    useAuth: boolean;
    path: string;
    tags: string[];
    handler: (...args: any) => void;
}

export interface IRoute<TArguments extends ArgumentsBase, TResult> {
    path: (path: string) => IRoute<TArguments, TResult>;
    method: (method: HttpMethod) => IRoute<TArguments, TResult>;
    argsConverter: (converter: (req, res) => TArguments) => IRoute<TArguments, TResult>;
    handler: (handler: (args: TArguments) => TResult) => IRoute<TArguments, TResult>;
    useAuth: (useAuth: boolean) => IRoute<TArguments, TResult>;
    tags: (tags: string[]) => IRoute<TArguments, TResult>;
    build: () => IRouteOptions;
}

export interface IService {

}

export interface IRepository<TEntity> {
    add: (entity: TEntity) => Promise<TEntity>;
    delete: (entityId: string) => Promise<TEntity>;
    findAll: (options?: any) => Promise<TEntity[]>;
    fingById: (entityId: string) => Promise<TEntity>;
}