import express from 'express';
import cors from 'cors';
import config from 'config';
import { logger } from '@core';
import { registerRoutes } from './router';

const handleError = (err, req, res, next) => {
    if(!err) {
        return next();
    }

    res.status(500).send(err.message);
}
const succeed = (req, res, next) => {
    res.code(200).send();
}

class HttpServer {
    private _app = express();

    init() {
        this._app.use(cors());

        registerRoutes(this._app);

        this._app.use(succeed);
        this._app.use(handleError);

        this._app.listen(config.server.port);
        logger.info(`Listening to ${config.server.port} port`);
    }
}

export default new HttpServer();