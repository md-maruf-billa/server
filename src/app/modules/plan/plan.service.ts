import { Request } from "express";
import httpStatus from 'http-status';
import { AppError } from "../../utils/app_error";
import { PlanModel } from "./plan.schema";

const create_new_plan_into_db = async (req: Request) => {
    // check if already have 3 plans
    const prevPlan = await PlanModel.find().lean();
    if (prevPlan.length >= 3) {
        throw new AppError("Already 3 plan exist !!", httpStatus.BAD_REQUEST)
    }
    const result = await PlanModel.create(req?.body)
    return result;
}

const update_plan_into_db = async (req: Request) => {
    const planId = req?.params?.planId;
    const isPlanExist = await PlanModel.findById(planId).lean();
    if (!isPlanExist) {
        throw new AppError("Plan not found!!", httpStatus.NOT_FOUND)
    }
    const result = await PlanModel.findByIdAndUpdate(planId, req?.body, { new: true })
    return result;
}

const get_all_plan_from_db = async () => {
    const result = await PlanModel.find().lean()
    return result;
}

const get_single_plan_from_db = async (req: Request) => {
    const planId = req?.params?.planId;
    const isPlanExist = await PlanModel.findById(planId).lean();
    if (!isPlanExist) {
        throw new AppError("Plan not found!!", httpStatus.NOT_FOUND)
    }
    return isPlanExist;
}

const subscribe_plan_into_db = async (req: Request) => {
    // const planId = req?.params?.planId;
    // const user = req?.user;
    // const isExistUser = await Account_Model.findOne({ email: user?.email }).lean();
    // if (!isExistUser) {
    //     throw new AppError("User not found!!", httpStatus.NOT_FOUND)
    // }
    // // check already have plan
    // if (isExistUser?.isPlan) {
    //     throw new AppError("Already have a active plan!!", httpStatus.NOT_FOUND)
    // }
    // const isPlanExist = await PlanModel.findById(planId).lean();
    // if (!isPlanExist) {
    //     throw new AppError("Plan not found!!", httpStatus.NOT_FOUND)
    // }
    // const duration = String(isPlanExist?.duration) + (isPlanExist?.durationUnit == "year" ? "y" : 'm')
    // const token = jwtHelpers.generateToken({ email: user?.email }, configs.jwt.plan_token!, duration);
    // // handel payment login hare


    // // subscriber payload;
    // const subscriberPayload: TSubscriber = {
    //     accountId: isExistUser?._id,
    //     planId: isPlanExist?._id,
    //     trxId: "dkfdhf",
    //     method: "Bkash"

    // }
    // await SubscriberModel.create(subscriberPayload);
    // const result = await Account_Model.findOneAndUpdate({ email: user?.email }, {
    //     isPlan: true,
    //     planToken: token,
    //     planId: isPlanExist?._id

    // }, { new: true })
    // return result;
}

export const plan_services = {
    create_new_plan_into_db,
    update_plan_into_db,
    get_all_plan_from_db,
    get_single_plan_from_db,
    subscribe_plan_into_db
}