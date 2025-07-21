import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from 'http-status';
import { plan_services } from "./plan.service";

const create_new_plan = catchAsync(async (req, res) => {
    const result = await plan_services.create_new_plan_into_db(req)
    manageResponse(res, {
        success: true,
        message: "Plan create successful.",
        statusCode: httpStatus.CREATED,
        data: result
    })
})

const update_plan = catchAsync(async (req, res) => {
    const result = await plan_services.update_plan_into_db(req)
    manageResponse(res, {
        success: true,
        message: "Plan update successful.",
        statusCode: httpStatus.OK,
        data: result
    })
})

const get_all_plan = catchAsync(async (req, res) => {
    const result = await plan_services.get_all_plan_from_db()
    manageResponse(res, {
        success: true,
        message: "Plan fetched successful.",
        statusCode: httpStatus.OK,
        data: result
    })
})

const get_single_plan = catchAsync(async (req, res) => {
    const result = await plan_services.get_single_plan_from_db(req)
    manageResponse(res, {
        success: true,
        message: "Plan fetched successful.",
        statusCode: httpStatus.OK,
        data: result
    })
})

const subscribe_plan = catchAsync(async (req, res) => {
    const result = await plan_services.subscribe_plan_into_db(req)
    manageResponse(res, {
        success: true,
        message: "Plan subscribe successful.",
        statusCode: httpStatus.OK,
        data: result
    })
})

export const plan_controllers = {
    create_new_plan,
    update_plan,
    get_all_plan,
    get_single_plan,
    subscribe_plan
}