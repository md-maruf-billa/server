import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { planValidation } from "./plan.validation";
import { plan_controllers } from "./plan.controller";

const planRoute = Router();

planRoute.post(
    "/create",
    auth("ADMIN"),
    RequestValidator(planValidation.create),
    plan_controllers.create_new_plan
)

planRoute.post(
    "/update/:planId",
    auth("ADMIN"),
    RequestValidator(planValidation.update),
    plan_controllers.update_plan
)

planRoute.get(
    "/get-all",
    plan_controllers.get_all_plan
)

planRoute.get(
    "/get-single/:planId",
    plan_controllers.get_single_plan
)

export default planRoute;