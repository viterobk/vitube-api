import config from 'config';
import { IAuthInfo } from "@core/interfaces";
import { base64Decode, SHA256Encode } from "../helpers/cryptoHelpers";
import { isExpired } from '../helpers/dateTimeHelpers';
import Service from "./common/Service";

const AUTH_TOKEN_PREFIX = 'Bearer ';

export class AuthorizationService extends Service {
    isTokenValid(token) {
        const { secret } = config.auth;
        const tokenParts = token.split('.');
        if(tokenParts.length !== 3) return false;
        const signature = SHA256Encode(`${tokenParts[0]}.${tokenParts[1]}`, secret);
        return signature === tokenParts[2];
    }
    decodeToken(token) {
        const tokenParts = token.split('.');
        return {
            header: JSON.parse(base64Decode(tokenParts[0])),
            payload: JSON.parse(base64Decode(tokenParts[1])),
        };
    }

    async authorizeUser(authorizationHeader?: string): Promise<IAuthInfo> {
        const token = authorizationHeader?.indexOf(AUTH_TOKEN_PREFIX) === 0
            ? authorizationHeader.substring(AUTH_TOKEN_PREFIX.length)
            : undefined;
        if (!token || !this.isTokenValid(token)) return { isValid: false };

        const { payload: { userId, isAdmin, exp } } = this.decodeToken(token);
        const expired = isExpired(new Date(), exp);
        
        return {
            isValid: true,
            expired,
            userId,
            isAdmin,
        }
    }
}