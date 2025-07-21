import mongoose, { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
    pageId: { type: mongoose.Types.ObjectId, ref: 'landing-page', required: false },
    name: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: Number, required: false },
    quantity: { type: Number, required: false, default: 1 },
    offer: { type: Number, required: false },
    shippingFee: { type: Number, required: false },
    totalPrice: { type: Number, required: false },
    status: { type: String, default: "pending" }
}, { timestamps: true });

export const OrderModel = model('order', orderSchema);
