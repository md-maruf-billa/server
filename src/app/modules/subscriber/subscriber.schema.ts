import { model, Schema } from "mongoose";
import { TSubscriber } from "./subscriber.interface";

const subscriberSchema = new Schema<TSubscriber>({
    accountId: { type: Schema.ObjectId, required: true, ref: "account" },
    planId: { type: Schema.ObjectId, required: true, ref: "plan" },
    trxId: { type: String, required: true },
    method: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
})

export const SubscriberModel = model<TSubscriber>("subscriber", subscriberSchema)