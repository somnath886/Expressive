import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

import BodyValidation from "../functions/body.validation.decorator";
import Controller from "../functions/controller.decorator";
import { Get, Post } from "../functions/handler.decorator";
import PostRepository from "../repository/post/post.repository";
import { repositoryTypes } from "../repository/types";
import { IsString } from "class-validator";
import PostEntity from "../models/post/post.entity";

class postReqDto {
  @IsString()
  name;

  @IsString()
  description;
}

@injectable()
@Controller("/post")
export default class PostController {
  private _postRepository: PostRepository;

  constructor(
    @inject(repositoryTypes.POST_REPOSITORY) postRepository: PostRepository
  ) {
    this._postRepository = postRepository;
  }

  @Get("")
  async getPosts() {
    return await this._postRepository.getAll();
  }

  @Post("")
  @BodyValidation(postReqDto)
  async createPost(body: postReqDto) {
    const entity = new PostEntity(
      new ObjectId().toHexString(),
      body.name,
      body.description,
      new Date(),
      new Date()
    );
    return await this._postRepository.create(entity);
  }
}
