import { Model } from "mongoose";

export class BaseService<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  getAll = async (): Promise<T[]> => {
    return this.model.find().sort({ createdAt: -1 });
  }  
}