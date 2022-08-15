import { IAuthStrategy, IUserInfo } from "../../core/interfaces";

class AdminAuthStrategy implements IAuthStrategy {
    authorize = (user) => {
        const authorized = user.isValid && user.role === 'admin';
        return {
            authorized,
            responseCode: authorized ? undefined : 404,
            responseMessage: authorized ? undefined : 'Not found',
        }
    }
}

export default new AdminAuthStrategy();