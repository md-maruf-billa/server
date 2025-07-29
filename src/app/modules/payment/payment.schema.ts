import { model, Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const PaymentSchema = new Schema<TPayment>(
    {
        planId: { type: String, required: true },
        accountId: { type: String, required: true },
        name: { type: String, required: true },
        number: { type: String ,required:false},
        email: { type: String, required: true },
        invoiceId: { type: String },
        paymentId: { type: String },
        amount: { type: String },
        verifiedStatus: { type: Boolean, default:false },
        trxID: { type: String },
        reference: { type: String },
        payerAccountNumber: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const PaymentModel = model<TPayment>("payment", PaymentSchema);