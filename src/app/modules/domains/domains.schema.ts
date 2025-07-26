import { model, Schema } from "mongoose";
import { TDomain } from "./domains.interface";

const domainSchema = new Schema<TDomain>({
    domain: { type: String, required: true },
    siteId: { type: String, required: true },
    verified: { type: Boolean, default: false },
    userId: { type: String, required: true },
    txtRecord: { type: String, required: false }
}, {
    versionKey: false,
    timestamps: true
})

export const DomainModel = model<TDomain>("domain", domainSchema);