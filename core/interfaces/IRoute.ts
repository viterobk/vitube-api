import { IAuthStrategy } from "./IAuthStrategy";
import { HttpMethod } from "../types";
import { IExecutionContextBase } from "./IExecutionContext";
import { IRouteOptions } from './IRouteOptions';

export interface IRoute<TArguments, TResult, TExecutionContext> {
    path: (path: string) => IRoute<TArguments, TResult, TExecutionContext>;
    method: (method: HttpMethod) => IRoute<TArguments, TResult, TExecutionContext>;
    argsConverter: (converter: (req, res) => TArguments) => IRoute<TArguments, TResult, TExecutionContext>;
    handler: (handler: (args: TArguments, h: TExecutionContext) => TResult) => IRoute<TArguments, TResult, TExecutionContext>;
    authStrategy: (authStrategy: IAuthStrategy) => IRoute<TArguments, TResult, TExecutionContext>;
    build: () => IRouteOptions;
}
