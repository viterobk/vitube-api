import { IAuthStrategy } from "@core/interfaces";

class AllAuthStrategy implements IAuthStrategy {
    authorize = () => {
        return {
            authorized: true,
        }
    }
}

export default new AllAuthStrategy();