import { IServices } from "../../services";
import { ICurrentUser } from "./ICurrentUser";

export interface IExecutionContextBase {
    services: IServices;
    currentUser: ICurrentUser;
}