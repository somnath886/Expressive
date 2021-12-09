import { injectable } from "inversify";
import { ObjectId } from "mongodb";
import { Document } from "mongoose";
import "reflect-metadata";

import PostEntity from "../../models/post/post.entity";
import { IPostModel } from "../../models/post/post.schema";
import IEntityFactory from "../entity.factory.interface";

@injectable()
export default class PostSchemaFactory
  implements IEntityFactory<IPostModel, PostEntity>
{
  schemaToEntity(model: IPostModel) {
    return new PostEntity(
      model._id.toHexString(),
      model.name,
      model.description,
      model.createdAt,
      model.updatedAt
    );
  }

  entityToSchema(entity: PostEntity): IPostModel {
    return {
      _id: new ObjectId(entity.id),
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
