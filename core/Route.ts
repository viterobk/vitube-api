import { ArgumentsBase, HttpMethod, IAuthStrategy, IExecutionContext, IRoute, UserRole } from "./interfaces";

export class Route<TArguments extends ArgumentsBase, TResult> implements IRoute<TArguments, TResult> {
    private _path: string;
    private _authStrategy: IAuthStrategy;
    private _argsConverter: (req, res) => TArguments;
    private _handler: (args: TArguments, h: IExecutionContext) => TResult;
    private _method: HttpMethod;

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

    handler = (handler: (args: TArguments, h: IExecutionContext) => TResult) => {
        this._handler = handler;
        return this;
    }

    build = () => {
        this._validateOptions();
        const handler = (req, res, next) => {
            const { user } = req.context;
            const { authorized, code, message } = this._authStrategy.authorize(user);
            if (!authorized) {
                res.status(code).send(message);
                next();
                return;
            }
            const args = this._argsConverter ? this._argsConverter(req, res) : undefined;
            const result = this._handler(args, req.context);
            res.status(200).send(result);
            next();
        }
        return {
            method: this._method,
            path: this._path,
            handler,
        }
    }
}