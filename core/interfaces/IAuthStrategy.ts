import { IAuthResult } from "./IAuthResult";
import { ICurrentUser } from "./ICurrentUser";

export interface IAuthStrategy {
    authorize: (user: ICurrentUser) => IAuthResult;
}