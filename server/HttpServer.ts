import express from 'express';
import _ from 'lodash';
import cors from 'cors';
import config from 'config';
import routes from '../routes';
import { IRouteOptions } from '../core/interfaces';
import { addContextMiddleware, authMiddleware, handleErrorMiddlware } from './middlwares';
import logger from '../core/logger';

export default class {
    private _app = express();

    private _registerRoute = (route: IRouteOptions) => {
        const { path, handler, method } = route;
        switch(method.toLowerCase()) {
            case 'get':
                this._app.get(path, handler)
                break;
            case 'post':
                this._app.post(path, handler)
                break;
            case 'put':
                this._app.put(path, handler)
                break;
            case 'delete':
                this._app.delete(path, handler)
                break;
            default:
                throw Error(`Unknown HTTP method: ${method}`);
        }
    }

    constructor() {
        this._app.use(cors());
        this._app.use(addContextMiddleware);
        this._app.use(authMiddleware);

        routes.map(this._registerRoute);

        this._app.use(handleErrorMiddlware);

        this._app.listen(config.server.port);
        logger.info(`Listening to ${config.server.port} port`);
    }
}