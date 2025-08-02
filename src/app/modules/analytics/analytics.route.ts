import { Router } from "express";
import { analytics_controllers } from "./analytics.controller";

const analyticsRouter = Router();
analyticsRouter.post("/", analytics_controllers.save_visitor_info)



export default analyticsRouter;