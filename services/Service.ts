import { IServices } from "./IServices";
import { ServiceBase } from "../core/ServiceBase";
import serviceProvider from "./serviceProvider";
import repositoryProvider from "../repositories/repositoryProvider";
import { IRepositories } from "../repositories";

export default class Service extends ServiceBase<IServices, IRepositories> {
    constructor() {
        super(serviceProvider, repositoryProvider);
    }
}