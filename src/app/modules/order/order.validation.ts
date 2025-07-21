import { z } from 'zod';
const create = z.object({
    pageId: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    number: z.string().min(1, 'Number is required'),
    address: z.string().min(1, 'Address is required'),
    shippingFee: z.number(),
    quantity: z.number(),
});

const update = z.object({
    name: z.string().optional(),
    number: z.string().optional(),
    address: z.string().optional(),
    quantity: z.number().optional(),
    shippingFee: z.number().optional(),
    status: z.enum(["pending", "confirm", "cancel", 'shipped']).optional()
})
const status = z.object({
    status: z.enum(["pending", "confirm", "cancel", 'shipped'])
})
export const order_validation_schema = {
    create,
    update,
    status
}