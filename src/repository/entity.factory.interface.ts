export default interface IEntityFactory<TModel, TEntity> {
  schemaToEntity(schema: TModel): TEntity;
  entityToSchema(entity: TEntity): TModel;
}
