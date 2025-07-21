import httpStatus from 'http-status';
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { order_services } from "./order.service";

const create_order = catchAsync(async (req, res) => {
    console.log(req?.body)
    const result = await order_services.create_order_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Order pleased successful.",
        data: result
    })
})

const get_all_order = catchAsync(async (req, res) => {
    const { pageId } = req?.params;
    const result = await order_services.get_all_order_from_db(pageId)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order fetched successful.",
        data: result
    })
})

const get_single_order = catchAsync(async (req, res) => {
    const { pageId, orderId } = req?.params;
    const result = await order_services.get_single_order_from_db(pageId, orderId)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order fetched successful.",
        data: result
    })
})

const delete_order = catchAsync(async (req, res) => {
    const { pageId, orderId } = req?.params;
    const result = await order_services.delete_order_from_db(pageId, orderId)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order delete successful.",
        data: result
    })
})
const update_order = catchAsync(async (req, res) => {
    const result = await order_services.update_order_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order update successful.",
        data: result
    })
})

const update_order_status = catchAsync(async (req, res) => {
    const result = await order_services.update_order_status_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order status update successful.",
        data: result
    })
})
export const order_controllers = {
    create_order,
    get_all_order,
    get_single_order,
    delete_order,
    update_order,
    update_order_status
}