import { IEntity } from "../core/interfaces";

export interface IVideo extends IEntity {
    id: number;
    url: string;
    name: string;
    tags: string[];
    description: string;
}