import { ArgumentsBase, HttpMethod, IRoute } from "./interfaces";

export class Route<TArguments extends ArgumentsBase, TResult> implements IRoute<TArguments, TResult> {
    private _path: string;
    private _useAuth: boolean = true;
    private _argsConverter: (req, res) => TArguments;
    private _handler: (args: TArguments) => TResult;
    private _method: HttpMethod;
    private _tags: string[] = ['admin'];

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

    handler = (handler) => {
        this._handler = handler;
        return this;
    }

    tags = (tags) => {
        this._tags = tags;
        return this;
    }

    build = () => {
        this._validateOptions();
        const handler = (req, res) => {
            const args = this._argsConverter(req, res);
            const result = this._handler(args);
            res.status(200).send(result);
        }
        return {
            method: this._method,
            path: this._path,
            useAuth: this._useAuth,
            tags: this._tags,
            handler,
        }
    }
}