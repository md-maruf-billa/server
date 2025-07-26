import { Request } from "express";
import { AppError } from "../../utils/app_error";
import dnsMatcher from "../../utils/dnsMatcher";
import { DomainModel } from "./domains.schema";

const add_new_domain_into_db = async (req: Request) => {
    const payload = req?.body;
    // check domain already exist
    const isDomainExist = await DomainModel.findOne({ domain: payload?.domain }).lean();
    if (isDomainExist) {
        throw new AppError("Domain already exist !!", 500)
    }
    // make text record
    const textRecord = `oyoubuilder-verification=${payload?.domain?.split('.')[0]}`
    const registerPayload = {
        ...payload,
        txtRecord: textRecord
    }
    const result = await DomainModel.create(registerPayload);
    return result;
}

const verify_domain_into_db = async (domain: string) => {

    // check domain exist on db
    const isDomainExist = await DomainModel.findOne({ domain }).lean();
    if (!isDomainExist) {
        throw new AppError("Domain not found !!", 400)
    }
    const isVerified = dnsMatcher(domain, isDomainExist?.txtRecord)
    if (!isVerified) {
        throw new AppError("TXT does not point t", 400)
    }
    const result = await DomainModel.findOneAndUpdate(
        { domain },
        { verified: true },
        { new: true }
    );
    return result;

}


export const domain_services = {
    add_new_domain_into_db,
    verify_domain_into_db
}