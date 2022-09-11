import { IExecutionContext } from "./IExecutionContext";
import { RouteBase } from "@core";
export class Route<TArguments, TResult> extends RouteBase<TArguments, TResult, IExecutionContext> {
    protected _getExecutionContext = (req, res) => {
        const { services, currentUser } = req.context;
        return {
            services,
            currentUser,
        };
    };
}