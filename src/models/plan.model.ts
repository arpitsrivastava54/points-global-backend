import mongoose, { Schema } from "mongoose";
import { PlanType } from "../types/enums";

export interface IPlan extends Document {
  name: string;
  price: number;
  tokens: number;
  type: PlanType;
}

const PlanSchema: Schema = new Schema<IPlan>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  tokens: { type: Number, required: true },
  type: { type: String, enum: [PlanType.Basic,PlanType.Standard,PlanType.Premium] },
}, {
  timestamps: true,
});

export const Plan = mongoose.model<IPlan>('Plan', PlanSchema);