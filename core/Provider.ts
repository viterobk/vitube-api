import { IProvider } from "./interfaces/IProvider";

export class Provider<TDataType> implements IProvider<TDataType> {
    data: TDataType;
    initialize = (data: TDataType) => {
        this.data = data;
    }
}