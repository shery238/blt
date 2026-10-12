import { z } from "zod";

export const areasOfInterest = [
  "Artificial Intelligence and Automation",
  "Data and Analytics",
  "Cloud and Platform Engineering",
  "Digital Transformation",
  "Healthcare Research and Innovation",
  "Responsible AI and Governance",
  "Research partnership",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  company: z.string().trim().min(2, "Enter your organisation's name").max(160),
  email: z.string().trim().email("Enter a work email address, like name@organisation.co.uk").max(200),
  phone: z.string().trim().max(40).regex(/^[0-9+()\-\s]*$/, "Use digits, spaces and + only").optional().or(z.literal("")),
  interest: z.enum(areasOfInterest, { errorMap: () => ({ message: "Choose an area of interest" }) }),
  message: z.string().trim().min(20, "Tell us a little more, at least 20 characters").max(5000),
  consent: z.literal(true, { errorMap: () => ({ message: "Confirm you have read the privacy notice" }) }),
  // spam protection
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().int(),
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
