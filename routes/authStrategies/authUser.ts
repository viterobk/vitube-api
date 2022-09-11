import { IAuthStrategy, ICurrentUser } from "@core/interfaces";

class UserAuthStrategy implements IAuthStrategy {
    authorize = (user: ICurrentUser) => {
        const authorized = !!user;
        return {
            authorized,
            responseCode: authorized ? undefined : 404,
            responseMessage: authorized ? undefined : 'Not found',
        }
    }
}

export default new UserAuthStrategy();