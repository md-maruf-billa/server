import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { payment_services } from "./payment.service";

const initiate_payment = catchAsync(async (req, res) => {
    const result = await payment_services.initiate_payment_into_bkash(req)
    manageResponse(res, {
        success: true,
        message: "Payment initiated, Confirm your payment.",
        statusCode: 201,
        data: result
    })
})

const verified_payment = catchAsync(async (req, res) => {
    const paymentID = req?.params?.paymentID;
    const email = req?.params?.email;
    const result = await payment_services.validate_payment_into_bkash(paymentID, email)
    manageResponse(res, {
        success: true,
        message: "Payment verified",
        statusCode: 200,
        data: result
    })
})


const get_all_payment = catchAsync(async (req, res) => {
    const result = await payment_services.get_all_payment_from_db(req)
    manageResponse(res, {
        success: true,
        message: "All payments fetched",
        statusCode: 200,
        data: result
    })
})

export const payment_controller = {
    initiate_payment,
    verified_payment,
    get_all_payment
}