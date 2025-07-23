import { Router } from "express";
import auth from "../../middlewares/auth";
import { dashboard_controllers } from "./dashboard.controller";

const dashboardRouter = Router();


dashboardRouter.get("/overview", auth("USER"), dashboard_controllers.get_dashboard_overview)



export default dashboardRouter;