import { z } from "zod";

// Domain regex: allows subdomains, internationalized domains, and TLDs
const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,}$/;

const addNewDomain = z.object({
    domain: z.string().regex(domainRegex, {
        message: "Invalid domain format (e.g., example.com)",
    }),
    siteId: z.string().min(1, "siteId is required"),
    verified: z.boolean().optional(),
    userId: z.string().min(1, "userId is required"),
});

const verify = z.object({
    domain: z.string().regex(domainRegex, {
        message: "Invalid domain format (e.g., example.com)",
    }),
});


export const domainValidation = {
    addNewDomain,
    verify
}