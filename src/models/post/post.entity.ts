import { Timestamp } from "mongodb";

export default class PostEntity {
  private _id: string;
  public get id(): string {
    return this._id;
  }
  private _name: string;
  public get name(): string {
    return this._name;
  }
  private _description: string;
  public get description(): string {
    return this._description;
  }
  private _createdAt: Date;
  public get createdAt(): Date {
    return this._createdAt;
  }
  private _updatedAt: Date;
  public get updatedAt(): Date {
    return this._updatedAt;
  }

  constructor(
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }
}
