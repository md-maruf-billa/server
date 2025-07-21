import { model, Schema } from "mongoose";
import { TPlan } from "./plan.interface";

const planSchema = new Schema<TPlan>({
    name: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: Number, required: true },
    durationUnit: { type: String, required: true },
    pros: { type: [String], required: true },
    cons: { type: [String], required: true },
}, {
    versionKey: false,
    timestamps: true
})

export const PlanModel = model<TPlan>('plan', planSchema)