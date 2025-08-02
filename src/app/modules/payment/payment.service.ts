import { Request } from "express";
import { Secret } from "jsonwebtoken";
import { configs } from "../../configs";
import { AppError } from "../../utils/app_error";
import { executeAgreementPayment, initialAgreementPayment } from "../../utils/bakashPayment";
import { jwtHelpers } from "../../utils/JWT";
import queryBuilder from "../../utils/queryBuilder";
import { Account_Model } from "../auth/auth.schema";
import { PlanModel } from "../plan/plan.schema";
import { TPayment } from "./payment.interface";
import { PaymentModel } from "./payment.schema";

const initiate_payment_into_bkash = async (req: Request) => {
    const body = req?.body as TPayment;
    // check plan exist
    const isPlanExist = await PlanModel.findById(body?.planId)
    if (!isPlanExist) {
        throw new AppError("Selected plan not exist right now!!", 404)
    }
    // check user exist or block
    const isUserExist = await Account_Model.findOne({ _id: body?.accountId, isDeleted: false, isVerified: true, status: "ACTIVE" })
    if (!isUserExist) {
        throw new AppError("User account not exist or blocked!!", 404)
    }
    // initiate payment now
    const amount = isPlanExist?.offerPrice ? isPlanExist?.offerPrice : isPlanExist?.price;
    const initiatePay = await initialAgreementPayment(amount, body?.number)

    // const payment payload
    const paymentPayload: TPayment = {
        ...body,
        invoiceId: initiatePay?.merchantInvoiceNumber,
        paymentId: initiatePay?.paymentID,
        amount,
        verifiedStatus: false,
    }
    const expireUnit = isPlanExist?.durationUnit === "months"
        ? `${Number(isPlanExist?.duration) * 30}d`
        : `${Number(isPlanExist?.duration) * 365}d`; // fallback to years in days

    const planToken = jwtHelpers.generateToken(
        {
            email: body?.email,
            planId: body?.planId,
            maxPage: isPlanExist?.maxPage
        },
        configs.jwt.plan_token as Secret,
        expireUnit,
    );

    await PaymentModel.create(paymentPayload)
    await Account_Model.findByIdAndUpdate(
        body?.accountId,
        {
            planId: body?.planId,
            planToken
        },
        { upsert: true }
    )
    return initiatePay;
}

const validate_payment_into_bkash = async (paymentId: string, email: string) => {
    // Step 1: Check if user exists
    const user = await Account_Model.findOne({ email });
    if (!user) {
        throw new AppError("User account not exist or blocked!", 404);
    }

    // Step 2: Check if plan exists
    const plan = await PlanModel.findById(user.planId);
    if (!plan) {
        throw new AppError("Selected plan does not exist!", 404);
    }

    // Step 3: Execute payment
    const result = await executeAgreementPayment(paymentId);

    if (result?.statusCode === "0000") {
        // Step 4: Update payment status
        await PaymentModel.findOneAndUpdate(
            { paymentId },
            {
                trxID: result?.trxID,
                reference: result?.payerReference,
                payerAccountNumber: result?.payerAccount,
                verifiedStatus: true,
            }
        );

        // Step 5: Update user account plan status
        await Account_Model.findOneAndUpdate(
            { email },
            { isPlan: true }
        );
    }

    return {
        ...result,
        _id: plan?._id,
        name: plan?.name,
        price: plan?.price,
        offerPrice: plan?.offerPrice,
    };
};
const get_all_payment_from_db = async (req: Request) => {
    const keys = ['verifiedStatus', 'payerAccountNumber', 'trxID', 'paymentId', 'invoiceId', 'email', 'planId'];
    const filter = queryBuilder(req.query, keys);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await PaymentModel.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort("-createdAt")
        .lean();

    return result;
}

export const payment_services = {
    initiate_payment_into_bkash,
    validate_payment_into_bkash,
    get_all_payment_from_db
}
