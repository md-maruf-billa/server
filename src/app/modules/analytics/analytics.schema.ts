import { model, Schema } from "mongoose";
import { TAnalytics } from "./analytics.interface";

const analyticsSchema = new Schema<TAnalytics>({
    ip: { type: String },
    status: { type: String },
    country: { type: String },
    countryCode: { type: String },
    region: { type: String },
    regionName: { type: String },
    city: { type: String },
    zip: { type: String },
    lat: { type: Number },
    lon: { type: Number },
    timezone: { type: String },
    isp: { type: String },
    org: { type: String },
    as: { type: String },
    query: { type: String },
    deviceType: { type: String },
},
    {
        versionKey: false,
        timestamps: true
    })

export const AnalyticsModel = model<TAnalytics>("analytic", analyticsSchema)