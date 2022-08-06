import express from 'express';
import _ from 'lodash';
import path from 'path';
import cors from 'cors';
import { getServices } from './services';
import { getRepositories } from './repositories';
import routes from './routes';
import { IRouteOptions, IUserInfo } from './core/interfaces';

const app = express();

const executionContextCommon = {
    services: getServices(),
    repositories: getRepositories(),
}

const authorize = (req): IUserInfo => {
    console.log('Authorizing...');

    if (!req.headers?.auth) return undefined;

    return {
        id: 'some_id',
        role: 'admin',
    }
}

const registerRoute = (route: IRouteOptions) => {
    const { path, useAuth, handler, permission, method } = route;
    const regMethod = _.get(app, method)?.bind(app);
    if (!regMethod) throw Error(`Unknown HTTP method: ${method}`);

    regMethod(path, (req, res, next) => {
        const userInfo = authorize(req);
        const authorized = userInfo && (permission !== 'user' || userInfo.role === 'admin');
        if (useAuth && !authorized) {
            res.status(301).send('Unauthorized');
            next();
            return;
        }

        const executionContext = {
            ...executionContextCommon,
            userInfo,
        }
        handler(req, res, executionContext);
        next();
    });
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

routes.map(registerRoute);

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

app.listen(3000);