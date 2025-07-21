import { Types } from "mongoose";

export type TOrder = {
    pageId?: Types.ObjectId;
    name: string;
    number: string;
    address: string;
    price?: number;
    quantity?: number;
    offer?: number;
    shippingFee?: number;
    totalPrice?: number;
    status:'pending' | 'confirm' | 'cancel'|'shipped'
}