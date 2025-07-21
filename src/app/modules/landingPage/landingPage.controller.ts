import httpStatus from 'http-status';
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { landing_page_services } from "./landingPage.service";

// create new landing page
const create_new_landing_page = catchAsync(async (req, res) => {
    const result = await landing_page_services.create_new_landing_page_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Landing page created successful.",
        data: result
    })
})

// update basic info 
const update_landing_page = catchAsync(async (req, res) => {
    const result = await landing_page_services.update_landing_page_data_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Basic information updated",
        data: result
    })
})


// update logo
const upload_logo = catchAsync(async (req, res) => {
    const result = await landing_page_services.upload_logo_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Page logo upload successful.",
        data: result
    })
})

// get all pages
const get_all_landing_page = catchAsync(async (req, res) => {
    const result = await landing_page_services.get_all_landing_page_from_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Page's fetched successful.",
        data: result
    })
})
// get single page
const get_single_landing_page = catchAsync(async (req, res) => {
    const result = await landing_page_services.get_single_landing_page_from_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Website fetched successful.",
        data: result
    })
})

// update product
const upload_product = catchAsync(async (req, res) => {
    const result = await landing_page_services.upload_product_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Product update successful.",
        data: result
    })
})

// upload banner
const upload_banner = catchAsync(async (req, res) => {
    const result = await landing_page_services.upload_banner_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Page banner update successful.",
        data: result
    })
})

// product gallery
const upload_product_images = catchAsync(async (req, res) => {
    const result = await landing_page_services.upload_product_images_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gallery updated successful.",
        data: result
    })
})
// update reviews
const upload_reviews_images = catchAsync(async (req, res) => {
    const result = await landing_page_services.upload_reviews_images_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Reviews upload successful.",
        data: result
    })
})

// update product video
const update_product_video = catchAsync(async (req, res) => {
    const result = await landing_page_services.update_product_video_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Video upload successful.",
        data: result
    })
})

// update product features
const update_landing_page_features = catchAsync(async (req, res) => {
    const result = await landing_page_services.update_landing_page_features_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Features update successful.",
        data: result
    })
})
// update shipping fee
const update_landing_page_shipping_fee = catchAsync(async (req, res) => {
    const result = await landing_page_services.update_landing_page_shipping_fee_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Shipping fee update successful.",
        data: result
    })
})

// delete shipping fee
const delete_landing_page_shipping_fee = catchAsync(async (req, res) => {
    const result = await landing_page_services.delete_landing_page_sipping_fee_from_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Shipping fee delete successful.",
        data: result
    })
})

// delete landing pae
const delete_landing_page = catchAsync(async (req, res) => {
    const result = await landing_page_services.delete_landing_page_from_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Landing page delete successful.",
        data: result
    })
})
export const landing_page_controllers = {
    create_new_landing_page,
    upload_logo,
    get_all_landing_page,
    get_single_landing_page,
    update_landing_page,
    upload_product,
    upload_banner,
    upload_product_images,
    upload_reviews_images,
    update_product_video,
    update_landing_page_features,
    update_landing_page_shipping_fee,
    delete_landing_page_shipping_fee,
    delete_landing_page
}