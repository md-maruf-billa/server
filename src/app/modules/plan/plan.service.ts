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


export const plan_services = {
    create_new_plan_into_db,
    update_plan_into_db,
    get_all_plan_from_db,
    get_single_plan_from_db
}