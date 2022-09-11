export interface IProvider<TDataType> {
    data: TDataType,
    initialize: (data: TDataType) => void;
}