import { Request } from "express";
import { isLocalIp } from "../../utils/ipExtroctor";
import { AnalyticsModel } from "./analytics.schema";

const save_visitor_info_into_db = async (req: Request) => {
    const forwarded = req.headers['x-forwarded-for'];
    const body = req?.body;
    const ip = typeof forwarded === 'string'
        ? forwarded.split(',')[0]
        : req.socket?.remoteAddress || '';

    if (isLocalIp(ip)) {
        return
    } else {
        // find already ip exist
        const isIpExist = await AnalyticsModel.findOne({ ip });
        if (isIpExist) {
            console.log("Ip exist")
            return;
        }
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        const newPayload = {
            ip,
            ...data,
            ...body,
        }

        await AnalyticsModel.create(newPayload)
    }
}

export const analytics_services = {
    save_visitor_info_into_db
}