export type TPlan = {
    name: string;
    price: string;
    offerPrice?: string;
    duration: number;
    durationUnit: "months" | "year"
    pros: string[];
    cons: string[];
    isPopular?: boolean;
    maxPage?: string;
}