import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { template_services } from "./template.service";

const create_new_template = catchAsync(async (req, res) => {
    const result = await template_services.create_new_template_into_db(req)
    manageResponse(res, {
        statusCode: 201,
        message: "Template save successful",
        success: true,
        data: result
    })
})

const update_template = catchAsync(async (req, res) => {
    const result = await template_services.update_template_into_db(req)
    manageResponse(res, {
        statusCode: 201,
        message: "Template update successful",
        success: true,
        data: result
    })
})

const get_all_template = catchAsync(async (req, res) => {
    const result = await template_services.get_all_template_from_db()
    manageResponse(res, {
        statusCode: 201,
        message: "Template fetched successful",
        success: true,
        data: result
    })
})

export const template_controllers = {
    create_new_template,
    update_template,
    get_all_template
}