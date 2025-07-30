import z from "zod";

const create = z.object({
    templateName: z.string({ required_error: "Template name is required!" }),
})

const update = z.object({
    templateName: z.string().optional(),
})


export const template_validation = {
    create,
    update
}