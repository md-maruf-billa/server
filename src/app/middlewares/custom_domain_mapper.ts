import { NextFunction, Request, RequestHandler, Response } from "express";
import { DomainModel } from "../modules/domains/domains.schema";
import { AppError } from "../utils/app_error";

const customDomainMapper: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const host = req.headers.host?.toLowerCase();
    console.log(host)
    if (
        host?.includes("localhost") ||
        host?.includes("oyoubuilder.com") ||
        host?.includes("store.oyoubuilder.com") ||
        host?.includes("api.oyoubuilder.com")
    ) {
        return next();
    }

    try {
        const mapping = await DomainModel.findOne({ domain: host, verified: true });
        if (!mapping) {
            throw new AppError("Domain not found ", 404)
        }

        req.siteId = mapping.siteId;
        next();
    } catch (err) {
        next(err)
    }
};

export default customDomainMapper;
