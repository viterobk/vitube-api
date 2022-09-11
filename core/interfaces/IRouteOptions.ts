import { HttpMethod } from "../types";

export interface IRouteOptions {
    method: HttpMethod;
    path: string;
    handler: (req, res, next) => void;
}