import { inject, injectable } from "inversify";
import "reflect-metadata";

import PostEntity from "../../models/post/post.entity";
import PostSchema from "../../models/post/post.schema";
import modelTypes from "../../models/types";
import BaseRepository from "../base.repository.abstract";
import { factoryTypes } from "../types";
import PostSchemaFactory from "./post.schema.factory";

@injectable()
export default class PostRepository extends BaseRepository<
  PostSchema,
  PostEntity
> {
  private _postFactory: PostSchemaFactory;
  private _postSchema: PostSchema;

  constructor(
    @inject(factoryTypes.POST_FACTORY) postFactory: PostSchemaFactory,
    @inject(modelTypes.POST_MODEL) postSchema: PostSchema
  ) {
    super(postFactory, postSchema);
    this._postFactory = postFactory;
    this._postSchema = postSchema;
  }
}
