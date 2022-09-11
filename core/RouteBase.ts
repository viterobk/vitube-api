import { IAuthStrategy, IExecutionContextBase, IRoute } from "./interfaces";
import { HttpMethod } from "./types";

export abstract class RouteBase<TArguments, TResult, TExecutionContext> implements IRoute<TArguments, TResult, TExecutionContext> {
    private _path: string;
    private _authStrategy: IAuthStrategy;
    private _argsConverter: (req, res) => TArguments;
    private _handler: (args: TArguments, h: TExecutionContext) => TResult;
    private _method: HttpMethod;
    protected abstract _getExecutionContext: (req, res) => TExecutionContext;

    private _validateOptions = () => {
        const errors = [];
        if(!this._path) errors.push('Route path is not defined');
        if(!this._handler) errors.push('Route handler is not defined');
        if(!this._authStrategy) errors.push('Auth strategy is not defined');
        if(errors.length) {
            throw Error(`Route validation errors found:\r\n${errors.join('\r\n    ')}`);
        }
    }

    path = (path: string) => {
        this._path = path;
        return this;
    }

    method = (method: HttpMethod) => {
        this._method = method;
        return this;
    }

    authStrategy = (authStrategy: IAuthStrategy) => {
        this._authStrategy = authStrategy;
        return this;
    }

    argsConverter = (converter) => {
        this._argsConverter = converter;
        return this;
    }

    handler = (handler: (args: TArguments, h: TExecutionContext) => TResult) => {
        this._handler = handler;
        return this;
    }

    build = () => {
        this._validateOptions();
        const handler = async (req, res, next) => {
            try {
                const { user } = req.context;
                const { authorized, code, message } = this._authStrategy.authorize(user);
                if (!authorized) {
                    res.status(code).send(message);
                    next();
                    return;
                }
                const args = this._argsConverter ? this._argsConverter(req, res) : undefined;
                const executionContext = this._getExecutionContext(req, res);
                const result = await this._handler(args, executionContext);
                res.status(200).send(result);
                next();
            } catch (err) {
                next(err);
            }
        }
        return {
            method: this._method,
            path: this._path,
            handler,
        }
    }
}