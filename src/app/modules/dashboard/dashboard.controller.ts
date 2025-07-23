import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { dashboard_services } from "./dashboard.service";

const get_dashboard_overview = catchAsync(async (req, res) => {
    const result = await dashboard_services.get_dashboard_overview_from_db(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: "Overview fetched successful",
        data: result
    })
})




export const dashboard_controllers = {
    get_dashboard_overview
}