import { IAuthStrategy, ICurrentUser } from "@core/interfaces";

class AdminAuthStrategy implements IAuthStrategy {
    authorize = (user) => {
        const authorized = user?.isAdmin;
        return {
            authorized,
            responseCode: authorized ? undefined : 404,
            responseMessage: authorized ? undefined : 'Not found',
        }
    }
}

export default new AdminAuthStrategy();