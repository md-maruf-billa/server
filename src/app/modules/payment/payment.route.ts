import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { payment_controller } from "./payment.controller";
import { payment_validations } from "./payment.validation";

const paymentRouter = Router()
paymentRouter.post(
    "/initiate-payment",
    auth("USER"),
    RequestValidator(payment_validations.initiatePayment),
    payment_controller.initiate_payment
)
paymentRouter.post("/verify-payment/:paymentID/:email", auth("USER"), payment_controller.verified_payment)



export default paymentRouter