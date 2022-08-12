import { IRepositories } from "../repositories";
import { IServices } from "../services";

export interface IExecutionContext {
    repositories: IRepositories;
    services: IServices;
    user?: IUserInfo;
}

export interface IUserInfo {
    id: string;
    role: UserRole;
};

export interface ArgumentsBase {
    executionContext: IExecutionContext;
}

export type UserRole = 'user' | 'admin';
export type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export interface IRouteOptions {
    method: HttpMethod;
    path: string;
    handler: (req, res, next) => void;
}

export interface IRoute<TArguments extends ArgumentsBase, TResult> {
    path: (path: string) => IRoute<TArguments, TResult>;
    method: (method: HttpMethod) => IRoute<TArguments, TResult>;
    argsConverter: (converter: (req, res) => TArguments) => IRoute<TArguments, TResult>;
    handler: (handler: (args: TArguments, h: IExecutionContext) => TResult) => IRoute<TArguments, TResult>;
    useAuth: (useAuth: boolean) => IRoute<TArguments, TResult>;
    permission: (permission: UserRole) => IRoute<TArguments, TResult>;
    build: () => IRouteOptions;
}

export interface IRepository<TEntity> {
    add: (entity: TEntity) => Promise<TEntity>;
    delete: (entityId: string) => Promise<TEntity>;
    findAll: (options?: any) => Promise<TEntity[]>;
    fingById: (entityId: string) => Promise<TEntity>;
}

export interface IInitializer {
    initialize: () => void;
}