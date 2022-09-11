import { IServices } from "@services";
import { ICurrentUser } from '@core/interfaces';

export interface IExecutionContext {
    services: IServices;
    user?: ICurrentUser;
}