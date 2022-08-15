import { IEntity } from "../core/interfaces";

export interface IUser extends IEntity {
    id: number;
    email: string;
    name: string;
    role: string;
}