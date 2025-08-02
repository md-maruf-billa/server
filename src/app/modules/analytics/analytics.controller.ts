import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { analytics_services } from "./analytics.service";

const save_visitor_info = catchAsync(async (req, res) => {
    const result = await analytics_services.save_visitor_info_into_db(req)
    manageResponse(res, {
        statusCode: 201,
        success: true,
        message: "Visitor counted",
        data:result
    })

})

export const analytics_controllers = {
    save_visitor_info
}