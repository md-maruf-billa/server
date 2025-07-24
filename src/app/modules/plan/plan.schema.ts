import { model, Schema } from "mongoose";
import { TPlan } from "./plan.interface";

const planSchema = new Schema<TPlan>({
    name: { type: String, required: true },
    price: { type: String, required: true },
    offerPrice: { type: String, required: false },
    duration: { type: Number, required: true },
    durationUnit: { type: String, required: true },
    pros: { type: [String], required: false },
    cons: { type: [String], required: false },
    isPopular: { type: Boolean, default: false }
}, {
    versionKey: false,
    timestamps: true
})

export const PlanModel = model<TPlan>('plan', planSchema)