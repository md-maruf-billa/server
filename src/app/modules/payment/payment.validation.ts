import { z } from "zod";

const initiatePayment = z.object({
    planId: z.string(),
    accountId: z.string(),
    name: z.string(),
    number: z.string().optional(),
    email: z.string().email(),
    invoiceId: z.string().optional(),
    paymentId: z.string().optional(),
    amount: z.string().optional(),
    trxID: z.string().optional(),
    reference: z.string().optional(),
    payerAccountNumber: z.string().optional(),
});


export const payment_validations = {
    initiatePayment
}