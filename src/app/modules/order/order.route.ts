import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { order_controllers } from "./order.controller";
import { order_validation_schema } from "./order.validation";

const orderRouter = Router();


orderRouter.post("/", RequestValidator(order_validation_schema.create), order_controllers.create_order)
orderRouter.get("/:pageId", auth("USER"), order_controllers.get_all_order)
orderRouter.get("/single/:pageId/:orderId", auth("USER"), order_controllers.get_single_order)
orderRouter.delete("/delete/:pageId/:orderId", auth("USER"), order_controllers.delete_order)
orderRouter.patch("/update/:pageId/:orderId", auth("USER"), RequestValidator(order_validation_schema.update), order_controllers.update_order)
orderRouter.put("/status/:pageId/:orderId", auth("USER"), RequestValidator(order_validation_schema.status), order_controllers.update_order_status)


export default orderRouter;