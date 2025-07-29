import { configs } from '../configs/index';
import { PaymentModel } from '../modules/payment/payment.schema';
import { AppError } from './app_error';

type TGrandToken = {
    statusCode: string;
    statusMessage: string;
    id_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
}

const grantTokenRes = async (): Promise<TGrandToken> => {
    const grandPayload = {
        app_key: configs?.bkash?.bkashAppKey!,
        app_secret: configs?.bkash?.bkashAppSecret!
    };
    const grantTokenAPI = await fetch(configs?.bkash?.bkashGrantURL as string, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "username": configs?.bkash?.userName!,
            "password": configs?.bkash?.bkashPassword!
        },
        body: JSON.stringify(grandPayload)
    });
    return await grantTokenAPI.json();
};

export const initialAgreementPayment = async (amount: string, ref?: string) => {
    try {
        const tokenRes = await grantTokenRes();
        if (tokenRes.statusCode !== "0000") {
            throw new Error(`Token generation failed: ${tokenRes.statusMessage}`);
        }
        const payments = await PaymentModel.find().lean();
        const payload = {
            mode: "0011",
            payerReference: ref,
            callbackURL: `${configs?.frontendURL!}/transaction`,
            amount,
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: `OYOUX-${new Date().getFullYear()}-${payments?.length + 1}`
        };
        const res = await fetch(configs?.bkash?.bkashCreatePaymentURL as string, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": tokenRes.id_token,
                "x-app-key": configs?.bkash?.bkashAppKey!
            },
            body: JSON.stringify(payload)
        });

        return await res.json();
    } catch (err) {
        console.error("CreateAgreementPayment Error:", err);
    }
};

export const executeAgreementPayment = async (paymentID: string) => {
    const tokenRes = await grantTokenRes();
    if (tokenRes.statusCode !== "0000") {
        throw new Error(`Token generation failed: ${tokenRes.statusMessage}`);
    }

    if (!paymentID) {
        throw new AppError("Payment id is required!!", 400)
    }
    const payload = {
        paymentID: paymentID
    }
    const res = await fetch(configs?.bkash?.bkashExecutePaymentURL as string, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "authorization": tokenRes.id_token,
            "x-app-key": configs?.bkash?.bkashAppKey!
        },
        body: JSON.stringify(payload)
    });
    return await res.json()
}