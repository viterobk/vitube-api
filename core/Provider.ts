import { IProvider } from "./IProvider";

export default class Provider<TDataType> implements IProvider<TDataType> {
    data: TDataType;
    initialize = (data: TDataType) => {
        this.data = data;
    }
}