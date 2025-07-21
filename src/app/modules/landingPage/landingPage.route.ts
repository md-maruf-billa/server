import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import uploader from "../../middlewares/uploader";
import { landing_page_controllers } from "./landingPage.controller";
import { landingPage_validation } from "./landingPage.validation";

const landingPageRouter = Router();

// basic info create
landingPageRouter.post(
    "/create-new-page",
    auth("USER", "ADMIN"),
    RequestValidator(landingPage_validation.create),
    landing_page_controllers.create_new_landing_page
)
// basic info update
landingPageRouter.patch(
    "/update-page-info/:id",
    auth("USER", "ADMIN"),
    RequestValidator(landingPage_validation.update),
    landing_page_controllers.update_landing_page
)

// update logo
landingPageRouter.post(
    "/update-logo/:id",
    auth("USER", "ADMIN"),
    uploader.single("image"),
    landing_page_controllers.upload_logo
)
// get all pages
landingPageRouter.get(
    "/get-all-landing-page",
    auth("USER", "ADMIN"),
    landing_page_controllers.get_all_landing_page
)
// get single page
landingPageRouter.get(
    "/get-single-landing-page/:id",
    landing_page_controllers.get_single_landing_page
)

// upload product
landingPageRouter.post(
    "/update-product/:id",
    auth("USER", "ADMIN"),
    RequestValidator(landingPage_validation.uploadProduct),
    landing_page_controllers.upload_product
)
// upload banner
landingPageRouter.post(
    "/update-banner/:id",
    auth("USER", "ADMIN"),
    uploader.single("image"),
    async (req, res, next) => {
        req.body = JSON.parse(req?.body?.data)
        next()
    },
    RequestValidator(landingPage_validation.uploadBanner),
    landing_page_controllers.upload_banner
)
// product gallery
landingPageRouter.post(
    "/update-product-gallery/:id",
    auth("USER", "ADMIN"),
    uploader.array("images"),
    async (req, res, next) => {
        req.body = JSON.parse(req?.body?.data)
        next()
    },
    RequestValidator(landingPage_validation.updateGallery),
    landing_page_controllers.upload_product_images
)
// update reviews
landingPageRouter.post(
    "/update-reviews/:id",
    auth("USER", "ADMIN"),
    uploader.array("images"),
    async (req, res, next) => {
        req.body = JSON.parse(req?.body?.data)
        next()
    },
    RequestValidator(landingPage_validation.updateReviews),
    landing_page_controllers.upload_reviews_images
)

// update video
landingPageRouter.post(
    "/update-video/:id",
    auth("USER", "ADMIN"),
    RequestValidator(landingPage_validation.updateVideo),
    landing_page_controllers.update_product_video
)

// update features
landingPageRouter.post(
    "/update-features/:id",
    auth("USER", "ADMIN"),
    uploader.single("image"),
    async (req, res, next) => {
        req.body = JSON.parse(req?.body?.data)
        next()
    },
    RequestValidator(landingPage_validation.updateFeatures),
    landing_page_controllers.update_landing_page_features
)

// update shipping fee
landingPageRouter.post(
    "/update-shipping-fee/:id",
    auth("USER", "ADMIN"),
    RequestValidator(landingPage_validation.updateShippingFee),
    landing_page_controllers.update_landing_page_shipping_fee
)

// delete shipping fee
landingPageRouter.delete(
    "/delete-shipping-fee/:pageId/:shippingFeeId",
    auth("USER", "ADMIN"),
    landing_page_controllers.delete_landing_page_shipping_fee
)
// delete shipping fee
landingPageRouter.delete(
    "/delete-landing-page/:pageId",
    auth("USER", "ADMIN"),
    landing_page_controllers.delete_landing_page
)
export default landingPageRouter;