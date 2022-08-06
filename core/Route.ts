import { ArgumentsBase, HttpMethod, IExecutionContext, IRoute, UserRole } from "./interfaces";

export class Route<TArguments extends ArgumentsBase, TResult> implements IRoute<TArguments, TResult> {
    private _path: string;
    private _useAuth: boolean = true;
    private _argsConverter: (req, res) => TArguments;
    private _handler: (args: TArguments, h: IExecutionContext) => TResult;
    private _method: HttpMethod;
    private _permission: UserRole = 'admin';

    private _validateOptions = () => {
        const errors = [];
        if(!this._path) errors.push('Route path is not defined');
        if(!this._argsConverter) errors.push('Args converter is not defined');
        if(!this._handler) errors.push('Route handler is not defined');
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

    useAuth = (useAuth) => {
        this._useAuth = useAuth;
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

    permission = (permission) => {
        this._permission = permission;
        return this;
    }

    build = () => {
        this._validateOptions();
        const handler = (req, res, h) => {
            const args = this._argsConverter(req, res);
            const result = this._handler(args, h);
            res.status(200).send(result);
        }
        return {
            method: this._method,
            path: this._path,
            useAuth: this._useAuth,
            permission: this._permission,
            handler,
        }
    }
}