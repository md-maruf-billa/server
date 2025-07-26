import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { domain_controllers } from "./domains.controller";
import { domainValidation } from "./domains.validation";

const domainRoute = Router();

domainRoute.post(
    "/add",
    auth("USER"),
    RequestValidator(domainValidation.addNewDomain),
    domain_controllers.add_new_domain
)
domainRoute.post(
    "/verify",
    auth("USER"),
    RequestValidator(domainValidation.verify),
    domain_controllers.verify_domain
)



export default domainRoute;