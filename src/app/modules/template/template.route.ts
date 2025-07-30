import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import uploader from "../../middlewares/uploader";
import { template_controllers } from "./template.controller";
import { template_validation } from "./template.validation";

const templateRouter = Router();

templateRouter.post(
    "/create",
    auth("ADMIN"),
    uploader.single("image"),
    async (req, res, next) => {
        req.body = JSON.parse(req?.body?.data)
        next()
    },
    RequestValidator(template_validation.create),
    template_controllers.create_new_template
)
templateRouter.post(
    "/update/:id",
    auth("ADMIN"),
    uploader.single("image"),
    async (req, res, next) => {
        req.body = JSON.parse(req?.body?.data)
        next()
    },
    RequestValidator(template_validation.update),
    template_controllers.update_template
)
templateRouter.get("/", template_controllers.get_all_template)


export default templateRouter;