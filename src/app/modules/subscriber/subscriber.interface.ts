import { Types } from "mongoose";

export type TSubscriber = {
    accountId: Types.ObjectId;
    planId: Types.ObjectId;
    trxId: string;
    method: string;
}