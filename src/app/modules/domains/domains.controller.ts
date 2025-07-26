import catchAsync from "../../utils/catch_async"
import manageResponse from "../../utils/manage_response"
import { domain_services } from "./domains.service"

const add_new_domain = catchAsync(async (req, res) => {
    const result = await domain_services.add_new_domain_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: 201,
        message: "Domain added successful",
        data: result
    })
})

const verify_domain = catchAsync(async (req, res) => {
    const result = await domain_services.verify_domain_into_db(req?.body?.domain)
    manageResponse(res, {
        success: true,
        statusCode: 201,
        message: "Domain verify successful",
        data: result
    })
})





export const domain_controllers = {
    add_new_domain,
    verify_domain
}