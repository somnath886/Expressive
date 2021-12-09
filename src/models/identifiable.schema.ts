import { injectable } from "inversify";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IIdentifiableModel {
  _id: ObjectId;
}

@injectable()
export default abstract class IdentifiableSchema<T> {
  protected _schema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
  });
  protected _name: string;

  getSchema() {
    return this._schema;
  }

  getModel() {
    return mongoose.model<T>(this._name, this._schema);
  }
}
