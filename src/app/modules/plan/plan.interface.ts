export type TPlan = {
    name: string;
    price: string;
    duration: number;
    durationUnit: "month" | "year"
    pros: string[];
    cons: string[];
}