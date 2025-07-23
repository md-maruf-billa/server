import { model, Schema } from "mongoose";
import { TLandingPage } from "./landingPage.interface";

const shippingFeeSchema = new Schema({
    label: { type: String, required: true },
    value: { type: Number, required: true },
});
const landingPageSchema = new Schema<TLandingPage>({
    owner: { type: String, required: true },
    basicInfo: {
        pageName: { type: String, required: false },
        pageType: { type: String, required: false },
        pageEmail: { type: String, required: false },
        pageNumber: { type: String, required: false },
        pageCountry: { type: String, required: false },
        pageAddress: { type: String, required: false },
        pageLogo: { type: String, required: false },
    },
    banner: {
        bannerImage: { type: String, required: false },
        bannerTitle: { type: String, required: false },
        bannerDescription: { type: String, required: false },
    },
    product: {
        name: { type: String, required: false },
        price: { type: String, required: false },
        offer: { type: String, required: false },
        description: { type: String, required: false },
    },
    productGallery: {
        title: { type: String, required: false },
        productImages: { type: [String], default: [] },
    },
    productVideo: {
        title: { type: String, required: false },
        videoLink: { type: String, required: false },
    },
    features: {
        title: { type: String, required: false },
        featureImage: { type: String, required: false },
        content: { type: [String], default: [] },
    },
    reviews: {
        title: { type: String, required: false },
        images: { type: [String], default: [] },
    },
    setting: {
        language: { type: String, enum: ['english', 'bangla'], default: "english" },
        productSoldCount: { type: Boolean, required: false },
    },
    totalSold: { type: Number, default: 0 },
    pageStatus: { type: String, default: "active" },
    shippingFee: {
        type: [shippingFeeSchema],
        required: false,
        default: [],
    },
    scriptCode: { type: String, required: false },
    noScriptCode: { type: String, required: false },
}, { timestamps: true, versionKey: false });

export const LandingPageModel = model('landing-page', landingPageSchema);