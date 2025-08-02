import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { analytics_controllers } from "./analytics.controller";
import { analytic_validation } from "./analytics.validation";

const analyticsRouter = Router();
analyticsRouter.post("/", RequestValidator(analytic_validation.create), analytics_controllers.save_visitor_info)



export default analyticsRouter;