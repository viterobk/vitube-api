import { IUserInfo } from "../core/interfaces";
import Service from "./Service";

export class AuthorizationService extends Service {
    async authenticateUser(token: string): Promise<IUserInfo> {
        if (!token) return { isValid: false };

        return {
            isValid: true,
            id: 'user_id',
            role: 'admin',
        }
    }
}