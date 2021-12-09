import { injectable } from "inversify";

import IdentifiableSchema, {
  IIdentifiableModel,
} from "../models/identifiable.schema";
import IEntityFactory from "./entity.factory.interface";

@injectable()
export default abstract class BaseRepository<
  TSchema extends IdentifiableSchema<IIdentifiableModel>,
  TEntity
> {
  private _entityFactory: IEntityFactory<IIdentifiableModel, TEntity>;
  private _schema: TSchema;

  constructor(
    entityFactory: IEntityFactory<IIdentifiableModel, TEntity>,
    schema: TSchema
  ) {
    this._entityFactory = entityFactory;
    this._schema = schema;
  }

  async getAll() {
    const Model = this._schema.getModel();
    const docs = await Model.find();
    return docs.map((doc) => this._entityFactory.schemaToEntity(doc));
  }

  async create(entity: TEntity) {
    const Model = this._schema.getModel();
    const doc = new Model(this._entityFactory.entityToSchema(entity));
    await doc.save();
    return this._entityFactory.schemaToEntity(doc);
  }
}
