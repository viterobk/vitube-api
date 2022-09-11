import { IEntity } from "@core/interfaces";

export interface IUser extends IEntity {
    id?: string;
    authId: string;
    email: string;
    name: string;
}