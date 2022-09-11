import { IServices, serviceProvider } from '../services';

const AUTH_HEADER_NAME = 'authorization';

export const addContextMiddleware = (req, res, next) => {
    req.context = {
        services: serviceProvider.data,
    }
    next();
}

export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.context.services as IServices;
    const authorizationHeader = req.headers[AUTH_HEADER_NAME];
    req.context.user = await authorization.authorizeUser(authorizationHeader);
    next();
}

export const handleErrorMiddlware = (err, req, res, next) => {
    if(!err) {
        return next();
    }

    res.status(500).send(err.message);
}