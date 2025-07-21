import { z } from 'zod';

const create = z.object({
    basicInfo: z.object({
        pageName: z.string({ required_error: "Page name is required!" }),
        pageType: z.string({ required_error: "Page type is required!" }),
        pageEmail: z.string({ required_error: "Page email is required!" }).email(),
        pageNumber: z.string({ required_error: "WhatApp number is required!" }),
        pageCountry: z.string({ required_error: "Page country is required!" }),
        pageAddress: z.string({ required_error: "Physical address is required!" }),
        pageLogo: z.string().optional(),
    }),

})
const update = z.object({
    basicInfo: z.object({
        pageName: z.string().optional(),
        pageType: z.string().optional(),
        pageEmail: z.string().email().optional(),
        pageNumber: z.string().optional(),
        pageCountry: z.string().optional(),
        pageAddress: z.string().optional(),
        pageLogo: z.string().optional(),
    }),
})
const uploadProduct = z.object({
    product: z.object({
        name: z.string().optional(),
        price: z.string().optional(),
        offer: z.string().optional(),
        description: z.string().optional(),
    }),
})
const uploadBanner = z.object({
    banner: z.object({
        bannerTitle: z.string({ required_error: "Banner title is required!" }),
        bannerDescription: z.string({ required_error: "Banner description is required!" }),
    }),
})
const updateGallery = z.object({
    productGallery: z.object({
        title: z.string({ required_error: "Gallery Name is required!" }),
    })
})
const updateReviews = z.object({
    reviews: z.object({
        title: z.string().optional(),
    }),
})

const updateVideo = z.object({
    productVideo: z.object({
        title: z.string({ required_error: "Title is required!" }),
        videoLink: z.string({ required_error: "Video link is required!" }),
    }),
})
const updateFeatures = z.object({
    features: z.object({
        title: z.string({ required_error: "Title is required!" }),
        content: z.array(z.string()).optional(),
    }),
})


const updateShippingFee = z.object({
    label: z.string().min(1, 'Label is required'),
    value: z.number().nonnegative('Value must be 0 or more'),
})
const schema = z.object({
    owner: z.string({ required_error: "Owner is required" }).optional(),
    basicInfo: z.object({
        pageName: z.string().optional(),
        pageType: z.string().optional(),
        pageEmail: z.string().email().optional(),
        pageNumber: z.string().optional(),
        pageCountry: z.string().optional(),
        pageAddress: z.string().optional(),
        pageLogo: z.string().optional(),
    }),

    banner: z.object({
        bannerImage: z.string().optional(),
        bannerTitle: z.string().optional(),
        bannerDescription: z.string().optional(),
    }),

    product: z.object({
        name: z.string().optional(),
        price: z.string().optional(),
        offer: z.string().optional(),
        description: z.string().optional(),
    }),

    productGallery: z.object({
        title: z.string().optional(),
        productImages: z.array(z.string()).optional(),
    }),

    productVideo: z.object({
        title: z.string().optional(),
        videoLink: z.string().optional(),
    }),

    features: z.object({
        title: z.string().optional(),
        featureImage: z.string().optional(),
        content: z.array(z.string()).optional(),
    }),

    reviews: z.object({
        title: z.string().optional(),
        images: z.array(z.string()).optional(),
    }),

    setting: z.object({
        language: z.enum(['english', 'bangla']).default('english'),
        productSoldCount: z.boolean().optional(),
    }),

    totalSold: z.number().default(0),
});



export const landingPage_validation = {
    create,
    update,
    uploadProduct,
    uploadBanner,
    updateGallery,
    updateReviews,
    updateVideo,
    updateFeatures,
    updateShippingFee
}