import express from 'express';
import dotenv from 'dotenv';
import _ from 'lodash';
import path from 'path';
import cors from 'cors';
import { getServices } from './services';
import { getRepositories } from './repositories';
import routes from './routes';
import { IRouteOptions } from './core/interfaces';

const envPath = path.resolve(__dirname, './.env');
dotenv.config({ path: envPath });
const app = express();

const executionContextCommon = {
    services: getServices(),
    repositories: getRepositories(),
}

const authorize = (req, res, next) => {
    console.log(`Authorizing request: ${req.url}`);
    req.context = req.context || {};

    if (req.headers?.auth) {
        req.context.user = {
            id: 'user_id',
            role: 'user_role',
            name: 'user_name',
        }
    }
    next();
}

const registerRoute = (route: IRouteOptions) => {
    const { path, useAuth, handler, permission, method } = route;
    const regMethod = _.get(app, method)?.bind(app);
    if (!regMethod) throw Error(`Unknown HTTP method: ${method}`);

    regMethod(path, (req, res, next) => {
        const { user } = req.context;
        const authorized = user && (permission !== 'user' || user.role === 'admin');
        if (useAuth && !authorized) {
            res.status(301).send('Unauthorized');
            next();
            return;
        }

        const executionContext = {
            ...executionContextCommon,
            user,
        }
        handler(req, res, executionContext);
        next();
    });
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(authorize);

routes.map(registerRoute);

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

app.listen(process.env.APP_PORT);
console.log(`Listening to ${process.env.APP_PORT} port`);