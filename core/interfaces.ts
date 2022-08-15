import { IRepositories } from "../repositories";
import { IServices } from "../services";

export interface IExecutionContext {
    services: IServices;
    user?: IUserInfo;
}

export interface IUserInfo {
    isValid: boolean;
    id?: string;
    role?: UserRole;
};

export interface ArgumentsBase {
    executionContext: IExecutionContext;
}

export type UserRole = 'user' | 'admin';
export type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export type AuthStrategy = 'all' | 'user' | 'admin';

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
    authStrategy: (authStrategy: IAuthStrategy) => IRoute<TArguments, TResult>;
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

export interface IAuthResult {
    authorized: boolean;
    code?: number;
    message?: string;
}

export interface IAuthStrategy {
    authorize: (user: IUserInfo) => IAuthResult;
}

export interface IEntity {
    id: number;
}