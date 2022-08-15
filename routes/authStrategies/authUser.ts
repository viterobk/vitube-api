import { IAuthStrategy } from "../../core/interfaces";

class UserAuthStrategy implements IAuthStrategy {
    authorize = (user) => {
        const authorized = user.isValid;
        return {
            authorized,
            responseCode: authorized ? undefined : 404,
            responseMessage: authorized ? undefined : 'Not found',
        }
    }
}

export default new UserAuthStrategy();