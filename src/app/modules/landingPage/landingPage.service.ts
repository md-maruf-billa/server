import { Request } from "express";
import httpStatus from 'http-status';
import mongoose from "mongoose";
import { AppError } from "../../utils/app_error";
import uploadCloud from "../../utils/cloudinary";
import { OrderModel } from "../order/order.schema";
import { LandingPageModel } from "./landingPage.schema";

// create new landing page
const create_new_landing_page_into_db = async (req: Request) => {
    const user = req?.user;
    const payload = {
        ...req?.body,
        owner: user?.email
    }
    const result = await LandingPageModel.create(payload)
    return result;
}

// update landing page
const update_landing_page_data_into_db = async (req: Request) => {
    const user = req?.user;
    const id = req?.params?.id;
    const existing = await LandingPageModel.findOne({ owner: user?.email, _id: id });

    if (!existing) {
        throw new AppError("Website not found!", httpStatus.NOT_FOUND);
    }

    const updatedData = {
        basicInfo: {
            ...existing.basicInfo,
            ...req.body.basicInfo
        },
        templateId: req?.body?.templateId || existing?.templateId,
        setting: {
            ...existing.setting,
            ...req.body.setting
        }
    };
    const result = await LandingPageModel.findOneAndUpdate(
        { owner: user?.email, _id: id },
        updatedData,
        { new: true }
    );
    return result;
}

// update logo
const upload_logo_into_db = async (req: Request) => {
    const file = req?.file;
    const user = req?.user;
    const id = req?.params?.id;
    if (!file) {
        throw new AppError("No image file uploaded", httpStatus.BAD_REQUEST);
    }
    const webInfo = await LandingPageModel.findOne({ owner: user?.email, _id: id }).lean();
    if (!webInfo) {
        throw new AppError("Website not found!", httpStatus.NOT_FOUND)
    }
    const uploadedImage = await uploadCloud(file)
    const result = await LandingPageModel.findOneAndUpdate({ owner: user?.email, _id: id }, {
        $set: { 'basicInfo.pageLogo': uploadedImage?.secure_url }
    }, { new: true })
    return result;
}
// gat all pages
const get_all_landing_page_from_db = async (req: Request) => {
    const user = req?.user;
    const result = await LandingPageModel.find({ owner: user?.email }).lean()
    return result;
}
// get single page
const get_single_landing_page_from_db = async (req: Request) => {
    const id = req?.siteId || req?.params?.id;
    const result = await LandingPageModel.findById(id).lean()
    return result;
}

// update product
const upload_product_into_db = async (req: Request) => {
    const user = req?.user;
    const id = req?.params?.id;
    // check is website exist
    const existing = await LandingPageModel.findOne({ owner: user?.email, _id: id });
    if (!existing) {
        throw new AppError("Website not found!", httpStatus.NOT_FOUND);
    }

    const updatedData = {
        product: {
            ...existing.product,
            ...req?.body?.product
        }
    };
    const result = await LandingPageModel.findOneAndUpdate(
        { owner: user?.email, _id: id },
        updatedData,
        { new: true }
    );
    return result;
}

// update banner
const upload_banner_into_db = async (req: Request) => {
    const file = req?.file;
    const user = req?.user;
    const id = req?.params?.id;
    const webInfo = await LandingPageModel.findOne({ owner: user?.email, _id: id }).lean();
    if (!webInfo) {
        throw new AppError("Landing page not found!", httpStatus.NOT_FOUND)
    }
    let uploadedImage
    if (file) {
        uploadedImage = await uploadCloud(file)
    }

    const updatedPayload = {
        banner: {
            ...webInfo?.banner,
            ...req?.body?.banner,
            bannerImage: uploadedImage?.secure_url || webInfo?.banner?.bannerImage
        }
    }


    const result = await LandingPageModel.findOneAndUpdate(
        { owner: user?.email, _id: id },
        updatedPayload,
        { new: true })

    return result;
}

// product gallery
const upload_product_images_into_db = async (req: Request) => {
    const files = req?.files as Express.Multer.File[];
    const user = req?.user;
    const id = req?.params?.id;

    const webInfo = await LandingPageModel.findOne({ owner: user?.email, _id: id }).lean();
    if (!webInfo) {
        throw new AppError("Page not found!", httpStatus.NOT_FOUND);
    }

    // Upload all images in parallel and wait for results
    const uploadResults = await Promise.all(
        files.map(file => uploadCloud(file))
    );

    const uploadedImages: string[] = uploadResults.map(res => res!.secure_url);
    const updatedPayload = {
        productGallery: {
            ...webInfo?.productGallery,
            ...req?.body?.productGallery,
            productImages: uploadedImages.length > 0 ? uploadedImages : webInfo?.productGallery?.productImages
        }
    }

    const result = await LandingPageModel.findOneAndUpdate(
        { owner: user?.email, _id: id },
        updatedPayload,
        { new: true }
    );

    return result;
};

// reviews
const upload_reviews_images_into_db = async (req: Request) => {
    const files = req?.files as Express.Multer.File[];
    const user = req?.user;
    const id = req?.params?.id;
    const webInfo = await LandingPageModel.findOne({ owner: user?.email, _id: id }).lean();
    if (!webInfo) {
        throw new AppError("Page not found!", httpStatus.NOT_FOUND);
    }

    // Upload all images in parallel and wait for results
    const uploadResults = await Promise.all(
        files?.map(file => uploadCloud(file))
    );

    const uploadedImages: string[] = uploadResults.map(res => res!.secure_url);
    const updatedPayload = {
        reviews: {
            ...webInfo?.reviews,
            ...req?.body?.reviews,
            images: uploadedImages.length > 0 ? uploadedImages : webInfo?.reviews?.images
        }
    }

    const result = await LandingPageModel.findOneAndUpdate(
        { owner: user?.email, _id: id },
        updatedPayload,
        { new: true }
    );

    return result;
};
// update video
const update_product_video_into_db = async (req: Request) => {
    const user = req?.user;
    const id = req?.params?.id;
    const webInfo = await LandingPageModel.findOne({ owner: user?.email, _id: id }).lean();
    if (!webInfo) {
        throw new AppError("Page not found!", httpStatus.NOT_FOUND);
    }
    const updatedPayload = {
        productVideo: {
            ...webInfo?.productVideo,
            ...req?.body?.productVideo
        }
    }
    const result = await LandingPageModel.findOneAndUpdate(
        { owner: user?.email, _id: id },
        updatedPayload,
        { new: true }
    );
    return result;
}

// update features
const update_landing_page_features_into_db = async (req: Request) => {
    const file = req?.file;
    const user = req?.user;
    const id = req?.params?.id;
    const webInfo = await LandingPageModel.findOne({ owner: user?.email, _id: id }).lean();
    if (!webInfo) {
        throw new AppError("Page not found!", httpStatus.NOT_FOUND);
    }
    // upload image
    let uploadedImage
    if (file) {
        uploadedImage = await uploadCloud(file)
    }
    const updatedPayload = {
        features: {
            ...webInfo?.features,
            ...req?.body?.features,
            featureImage: uploadedImage?.secure_url ? uploadedImage?.secure_url : webInfo?.features?.featureImage
        }
    }
    const result = await LandingPageModel.findOneAndUpdate(
        { owner: user?.email, _id: id },
        updatedPayload,
        { new: true }
    );
    return result;

}
// update shipping fee
const update_landing_page_shipping_fee_into_db = async (req: Request) => {
    const user = req?.user;
    const id = req?.params?.id;
    const webInfo = await LandingPageModel.findOne({ owner: user?.email, _id: id }).lean();
    if (!webInfo) {
        throw new AppError("Page not found!", httpStatus.NOT_FOUND);
    }
    const payload = [
        ...(webInfo.shippingFee || []),
        req.body // Your { label, value } object
    ];
    const result = await LandingPageModel.findOneAndUpdate({ owner: user?.email, _id: id }, {
        shippingFee: payload
    }, { new: true })
    return result;
}

const delete_landing_page_sipping_fee_from_db = async (req: Request) => {
    const user = req?.user;
    const { pageId, shippingFeeId } = req?.params;
    const webInfo = await LandingPageModel.findOne({ owner: user?.email, _id: pageId }).lean();
    if (!webInfo) {
        throw new AppError("Page not found!", httpStatus.NOT_FOUND);
    }
    const updatedPayload = webInfo?.shippingFee?.filter(
        (fee) => fee._id!.toString() !== shippingFeeId
    );
    const result = await LandingPageModel.findOneAndUpdate({ owner: user?.email, _id: pageId }, {
        shippingFee: updatedPayload
    }, { new: true })
    return result;
}

const delete_landing_page_from_db = async (req: Request) => {
    const user = req?.user;
    const { pageId } = req?.params;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // Step 1: Check if the page exists
        const webInfo = await LandingPageModel.findOne({ owner: user?.email, _id: pageId }).session(session);
        if (!webInfo) {
            throw new AppError("Page not found!", httpStatus.NOT_FOUND);
        }
        // Step 2: Delete related orders
        await OrderModel.deleteMany({ pageId }).session(session);
        // Step 3: Delete the landing page
        const result = await LandingPageModel.findOneAndDelete({ owner: user?.email, _id: pageId }).session(session);
        // Step 4: Commit transaction
        await session.commitTransaction();
        session.endSession();
        return result;
    } catch (error) {
        // Rollback on error
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const add_script_codes_into_db = async (req: Request) => {
    const user = req?.user;
    const { pageId } = req?.params;
    const webInfo = await LandingPageModel.findOne({ owner: user?.email, _id: pageId });
    if (!webInfo) {
        throw new AppError("Page not found!", httpStatus.NOT_FOUND);
    }
    const result = await LandingPageModel.findOneAndUpdate({ owner: user?.email, _id: pageId }, {
        scriptCode: req?.body?.scriptCode || webInfo?.scriptCode,
        noScriptCode: req?.body?.noScriptCode || webInfo?.noScriptCode
    }, { new: true })
    return result
};



export const landing_page_services = {
    create_new_landing_page_into_db,
    upload_logo_into_db,
    get_all_landing_page_from_db,
    get_single_landing_page_from_db,
    update_landing_page_data_into_db,
    upload_product_into_db,
    upload_banner_into_db,
    upload_product_images_into_db,
    upload_reviews_images_into_db,
    update_product_video_into_db,
    update_landing_page_features_into_db,
    update_landing_page_shipping_fee_into_db,
    delete_landing_page_sipping_fee_from_db,
    delete_landing_page_from_db,
    add_script_codes_into_db
}