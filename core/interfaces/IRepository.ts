export interface IRepository<TEntity> {
    add: (entity: TEntity) => Promise<TEntity>;
    delete: (entityId: string) => Promise<TEntity>;
    findAll: (options?: any) => Promise<TEntity[]>;
    fingById: (entityId: string) => Promise<TEntity>;
}