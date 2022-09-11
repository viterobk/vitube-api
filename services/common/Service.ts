import { IServices } from "./IServices";
import { ServiceBase } from "@core";
import serviceProvider from "./serviceProvider";
import { IRepositories, repositoryProvider } from "@repositories";

export default class Service extends ServiceBase<IServices, IRepositories> {
    constructor() {
        super(serviceProvider, repositoryProvider);
    }
}