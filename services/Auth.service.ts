import crypto from 'crypto';
import config from 'config';
import Service from "./common/Service";
import {
    base64Encode,
    base64Decode,
    SHA256Encode,
} from '../helpers/cryptoHelpers';
import {
    getExpirationTime, isExpired
} from '../helpers/dateTimeHelpers';

export class AuthService extends Service {

    constructor() {
        super();

        const { refreshTokenLifeDays, accessTokenLifeMinutes } = config.auth;
        this._refreshTokenLifeTime = refreshTokenLifeDays * 24 * 60 * 60 * 1000; // lifetime in milliseconds
        this._accessTokenLifeTime = accessTokenLifeMinutes * 60 * 1000; // lifetime in milliseconds
    }

    private _refreshTokenLifeTime;
    private _accessTokenLifeTime;

    getExpirationTimestamp(lifetime) {
        return new Date().getTime() + lifetime;
    }

    getPasswordHash(password) {
        const { salt } = config.auth;
        return crypto.pbkdf2Sync(password, salt, 400, 64, 'md5').toString('hex');
    }

    isPasswordValid(password, passwordHash) {
        return this.getPasswordHash(password) === passwordHash;
    }

    generateRefreshToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    async updateRefreshToken(userAuthId: string): Promise<string> {
        const { auth } = this.getRepositories();
        const user = await auth.findById(userAuthId);
        if(!user) {
            throw Error(`User auth for ${userAuthId} not found`);
        }
        user.refreshToken = this.generateRefreshToken();
        user.refreshTokenExp = getExpirationTime(new Date(), this._refreshTokenLifeTime);
        auth.update(userAuthId, user);
        return user.refreshToken;
    }
    
    generateAccessToken(userAuth) {
        const { secret } = config.auth;
        const header = JSON.stringify({
            typ: 'JWT',
            alg: 'HS256',
        });
        const payload = JSON.stringify({
            userId: userAuth.userId,
            exp: this.getExpirationTimestamp(this._accessTokenLifeTime),
            isAdmin: userAuth.isAdmin,
        });
        const encodedHeader = base64Encode(header);
        const encodedPayload = base64Encode(payload);
        const signature = SHA256Encode(`${encodedHeader}.${encodedPayload}`, secret);
        return `${encodedHeader}.${encodedPayload}.${signature}`;
    }

    decodeAccessToken(accessToken) {
        const { secret } = config.auth;
        const [ header, payload, signature ] = accessToken.split('.');
        const checkSignature = SHA256Encode(`${header}.${payload}`, secret);
        if(checkSignature !== signature) {
            throw Error('Access token is invalid');
        }
        return {
            header: JSON.parse(base64Decode(header)),
            payload: JSON.parse(base64Decode(payload)),
        }
    }

    throwLoginError() {
        throw new Error('Login or password is incorrect');
    }

    async addUser(login: string, password: string) {
        const { auth } = this.getRepositories();
        if (await auth.findByLogin(login)) {
            throw Error(`User with ${login} login already exists`);
        }
        const userAuth = {
            login,
            passwordHash: this.getPasswordHash(password),
            isAdmin: false,
        };
        const result = await auth.create(userAuth);
        return result?.id;
    }

    async login(login, password) {
        const { auth } = this.getRepositories();
        const userAuth = await auth.findByLogin(login);
        if (!userAuth || !this.isPasswordValid(password, userAuth.passwordHash)) {
            this.throwLoginError();
        }
        const accessToken = this.generateAccessToken(userAuth);
        const refreshToken = this.updateRefreshToken(userAuth.id);
        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshAccessToken(accessToken, refreshToken) {
        const { auth } = this.getRepositories();
        const { payload: { userId } } = this.decodeAccessToken(accessToken);
        const userAuth = await auth.findById(userId);
        if (!userAuth) {
            throw Error(`User auth ${userId} not found`);
        }
        if (userAuth.refreshToken !== refreshToken || isExpired(new Date(), userAuth.refreshTokenExp)) {
            throw Error('Refresh token is invalid');
        }
        const newRefreshToken = this.updateRefreshToken(userAuth.id);
        const newAccessToken = this.generateAccessToken(userAuth);
        return {
            refreshToken: newRefreshToken,
            accessToken: newAccessToken,
        }
    }

    async logout(accessToken) {
        const { payload: { userId }} = this.decodeAccessToken(accessToken);
        const { auth } = this.getRepositories();
        const userAuth = await auth.findById(userId);
        if (!userAuth) {
            throw Error(`User auth ${userId} not found`);
        }
        return auth.update(userId, {
            ...userAuth,
            refreshToken: undefined,
            refreshTokenExp: undefined,
        });
    }

    async deleteUser(accessToken) {
        const { payload: { userId }} = this.decodeAccessToken(accessToken);
        const { auth } = this.getRepositories();
        return await auth.delete(userId);
    }
}