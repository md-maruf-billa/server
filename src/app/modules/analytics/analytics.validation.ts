import z from "zod";

const create = z.object({
    deviceType: z.string().optional()
})

export const analytic_validation = {
    create
}