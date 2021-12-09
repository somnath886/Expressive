import { injectable } from "inversify";
import { Timestamp } from "mongodb";

import IdentifiableSchema, { IIdentifiableModel } from "../identifiable.schema";

interface IPostModel extends IIdentifiableModel {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export default class PostSchema extends IdentifiableSchema<IPostModel> {
  constructor() {
    super();
    this._name = "posts";
    this._schema.add({
      name: { type: String, required: true },
      description: { type: String, required: true },
      createdAt: { type: Date, required: true },
      updatedAt: { type: Date, required: true },
    });
  }
}

export { IPostModel };
