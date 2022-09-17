import { IServices } from '../services';

const AUTH_HEADER_NAME = 'authorization';

export const authorization = async (req, res, next) => {
    const { authorization } = req.context.services as IServices;
    const authorizationHeader = req.headers[AUTH_HEADER_NAME];
    req.context.user = await authorization.authorizeUser(authorizationHeader);
    next();
}