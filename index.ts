import express from 'express';
import path from 'path';
import cors from 'cors';
import { getServices } from './services';
import { getRepositories } from './repositories';
import routes from './routes';
import { IRouteOptions } from './core/interfaces';

const app = express();

const executionContext = {
    services: getServices(),
    repositories: getRepositories(),
}

const authorize = (req, res, next) => {
    console.log('Authorizing...');
    next();
}

const registerRoute = (route: IRouteOptions) => {
    const { path, useAuth, handler } = route;
    if (useAuth) app.use(path, authorize)
    app.all(path, handler);
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

routes.map(registerRoute);

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

app.listen(3000);