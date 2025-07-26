import { NextFunction, Request, RequestHandler, Response } from "express";
import { DomainModel } from "../modules/domains/domains.schema";

const customDomainMapper: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const host = req.headers["x-forwarded-host"]?.toString().toLowerCase();
    console.log("browser host", host)
    if (
        host?.includes("localhost") ||
        host?.includes("oyoubuilder.com") ||
        host?.includes("api.oyoubuilder.com")
    ) {
        return next();
    }

    try {
        const mapping = await DomainModel.findOne({ domain: host, verified: true });
        req.siteId = mapping?.siteId;
        next();
    } catch (err) {
        next(err)
    }
};

export default customDomainMapper;
