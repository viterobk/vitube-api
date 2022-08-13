import { serviceProvider } from '../services';

export const addContextMiddleware = (req, res, next) => {
    req.context = {
        services: serviceProvider.data,
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