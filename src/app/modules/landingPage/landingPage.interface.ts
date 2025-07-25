type TShippingFee = {
    _id?: string;
    label: string,
    value: number,
}
export type TLandingPage = {
    owner: string;
    // basic info
    basicInfo: {
        pageName: string;
        pageType: string;
        pageEmail: string;
        pageNumber: string;
        pageCountry: string;
        pageAddress: string;
        pageLogo: string;
    };
    banner: {
        bannerImage: string;
        bannerTitle: string;
        bannerDescription: string;
    };
    product: {
        name: string;
        price: string;
        offer: string;
        description: string;
    };
    productGallery: {
        title: string;
        productImages: string[];
    };
    productVideo: {
        title: string;
        videoLink: string;
    };
    features: {
        title: string;
        featureImage: string;
        content: string[];
    };
    reviews: {
        title: string;
        images: string[]
    };
    setting: {
        language: 'english' | 'bangla';
        productSoldCount: boolean;
    };
    shippingFee?: TShippingFee[]
    totalSold: number;
    pageStatus: 'active' | 'block';
    scriptCode?: string;
    noScriptCode?: string;
    templateId?: number
}