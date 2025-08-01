import { z } from "zod";

const create = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).min(1, "Name cannot be empty"),

    price: z.string({
        required_error: "Price is required",
        invalid_type_error: "Price must be a string",
    }).min(1, "Price cannot be empty"),
    offerPrice: z.string().optional(),
    duration: z.number({
        required_error: "Duration is required",
        invalid_type_error: "Duration must be a number",
    }).min(1, "Duration cannot be empty"),
    durationUnit: z.enum(["year", "months"]),
    pros: z.array(
        z.string()
    ).optional(),
    cons: z.array(
        z.string()
    ).optional(),
    isPopular: z.boolean().default(false),
    maxPage: z.string().optional()
});

const update = z.object({
    name: z.string().optional(),
    price: z.string().optional(),
    duration: z.number().optional(),
    durationUnit: z.string().optional(),
    pros: z.array(
        z.string()
    ).optional(),
    cons: z.array(
        z.string()
    ).optional(),
});


export const planValidation = {
    create,
    update
}