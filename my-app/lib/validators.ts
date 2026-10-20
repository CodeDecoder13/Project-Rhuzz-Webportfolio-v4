import { z } from "zod";

// Subject lands in an email header, so it must be a single line.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.email("Enter a valid email").max(200),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(150)
    .regex(/^[^\r\n]*$/, "Subject must be one line"),
  message: z.string().trim().min(1, "Message is required").max(5000),
  website: z.string().optional(), // honeypot: real users never fill this
});

export type ContactInput = z.infer<typeof contactSchema>;
