import { IServices, serviceProvider } from '../services';

export const context = (req, res, next) => {
    req.context = {
        services: serviceProvider.data,
    }
    next();
}
