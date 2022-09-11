import { IEntity } from "@core/interfaces";

export interface IVideo extends IEntity {
    id?: string;
    userid: string;
    url: string;
    name: string;
    tags: string[];
    description: string;
}