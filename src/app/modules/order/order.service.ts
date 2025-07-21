import { Request } from "express";
import httpStatus from 'http-status';
import { AppError } from "../../utils/app_error";
import { LandingPageModel } from "../landingPage/landingPage.schema";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.schema";

const create_order_into_db = async (req: Request) => {
    const payload = req?.body;
    const id = payload?.pageId
    // check page exist or block
    const isPageExist = await LandingPageModel.findById(id);
    if (!isPageExist || isPageExist.pageStatus == "block") {
        throw new AppError("Page not found or blocked !!", httpStatus.NOT_FOUND)
    }
    // calculate offer pice and shipping cost
    const offerPrice = Number(isPageExist?.product?.price) - (Number(isPageExist?.product?.price) * (Number(isPageExist?.product?.offer) / 100))
    const totalPrice = (offerPrice * payload?.quantity) + payload?.shippingFee;
    // make order payload
    const orderPayload = {
        ...payload,
        price: isPageExist?.product?.price,
        offer: isPageExist?.product?.offer,
        totalPrice,

    }
    const result = await OrderModel.create(orderPayload);
    return result
}

const get_all_order_from_db = async (pageId: string) => {
    const isPageExist = await LandingPageModel.findById(pageId);
    if (!isPageExist || isPageExist.pageStatus == "block") {
        throw new AppError("Page not found or blocked !!", httpStatus.NOT_FOUND)
    }

    const result = await OrderModel.find({ pageId }).sort("-createdAt")
    return result;
}

const get_single_order_from_db = async (pageId: string, orderId: string) => {
    const result = await OrderModel.findOne({ pageId, _id: orderId })
    if (!result) {
        throw new AppError("Product not found!!", httpStatus.NOT_FOUND)
    }
    return result;
}

const delete_order_from_db = async (pageId: string, orderId: string) => {
    const result = await OrderModel.findOne({ pageId, _id: orderId })
    if (!result) {
        throw new AppError("Order not found!!", httpStatus.NOT_FOUND)
    }
    await OrderModel.findOneAndDelete({ pageId, _id: orderId })
    return;
}

const update_order_into_db = async (req: Request) => {
    const { pageId, orderId } = req.params;
    const payload = req.body as TOrder;

    // Check if page exists and is not blocked
    const page = await LandingPageModel.findById(pageId).lean();
    if (!page || page.pageStatus === 'block') {
        throw new AppError('Page not found or blocked !!', httpStatus.NOT_FOUND);
    }

    // Check if the order exists for the given page
    const order = await OrderModel.findOne({ _id: orderId, pageId }).lean();
    if (!order) {
        throw new AppError('Order not found!!', httpStatus.NOT_FOUND);
    }

    // Build update payload
    const updatePayload: Partial<TOrder> = {};

    if (payload.name) updatePayload.name = payload.name;
    if (payload.number) updatePayload.number = payload.number;
    if (payload.address) updatePayload.address = payload.address;
    if (payload.status) updatePayload.status = payload.status;

    // If quantity or shipping fee is updated, recalculate total
    if (payload.quantity || payload.shippingFee) {
        const basePrice = Number(page.product?.price) || 0;
        const offer = Number(page.product?.offer) || 0;
        const offerPrice = basePrice - (basePrice * (offer / 100));

        const quantity = payload.quantity ?? order.quantity ?? 1;
        const shippingFee = payload.shippingFee ?? order.shippingFee ?? 0;

        updatePayload.quantity = quantity;
        updatePayload.shippingFee = shippingFee;
        updatePayload.totalPrice = (offerPrice * quantity) + shippingFee;
    }


    // Perform the update in one go
    const result = await OrderModel.findOneAndUpdate(
        { _id: orderId, pageId },
        { $set: updatePayload },
        { new: true }
    );
    if (payload?.status == "confirm") {
        await LandingPageModel.findByIdAndUpdate(pageId, {
            totalSold: page?.totalSold + 1
        })
    }
    return result;
};
const update_order_status_into_db = async (req: Request) => {
    const { pageId, orderId } = req.params;
    const { status } = req?.body;
    // Check if page exists and is not blocked
    const page = await LandingPageModel.findById(pageId).lean();
    if (!page || page.pageStatus === 'block') {
        throw new AppError('Page not found or blocked !!', httpStatus.NOT_FOUND);
    }
    // Check if the order exists for the given page
    const order = await OrderModel.findOne({ _id: orderId, pageId }).lean();
    if (!order) {
        throw new AppError('Order not found!!', httpStatus.NOT_FOUND);
    }
    if (order?.status == status) {
        throw new AppError("Status already updated !!", httpStatus.BAD_REQUEST)
    }
    const result = await OrderModel.findOneAndUpdate({ _id: orderId, pageId }, { status }, { new: true })
    if (status == "confirm") {
        await LandingPageModel.findByIdAndUpdate(pageId, {
            totalSold: page?.totalSold + 1
        })
    }
    return result;
}

export const order_services = {
    create_order_into_db,
    get_all_order_from_db,
    get_single_order_from_db,
    delete_order_from_db,
    update_order_into_db,
    update_order_status_into_db
}
