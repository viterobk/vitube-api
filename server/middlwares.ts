import { getServices } from '../services';
import { getRepositories } from '../repositories';

const services = getServices();
const repositories = getRepositories();

export const addContextMiddleware = (req, res, next) => {
    req.context = {
        services,
        repositories,
    }
    next();
}
export const authorizeMiddleware = (req, res, next) => {
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
export const handleErrorMiddlware = (err, req, res, next) => {
    res.status(500).send(err.message);
    next();
}