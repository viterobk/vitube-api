import { IServices, serviceProvider } from '../services';

export const addContextMiddleware = (req, res, next) => {
    req.context = {
        services: serviceProvider.data,
    }
    next();
}

export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.context.services as IServices;
    req.context.user = await authorization.authenticateUser(req.headers?.auth);
    next();
}

export const handleErrorMiddlware = (err, req, res, next) => {
    res.status(500).send(err.message);
    next();
}