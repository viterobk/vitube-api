import { IEntity } from "@core/interfaces";

export interface IUserAuth extends IEntity {
    id?: string;
    login: string;
    passwordHash: string;
    isAdmin: boolean;
    refreshToken?: string;
    refreshTokenExp?: number;
}