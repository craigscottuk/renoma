import * as z from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\+?[0-9\s-]{9,}$/)
    .optional()
    .or(z.literal("")),
  topic: z.string().min(1),
  message: z.string().min(10).max(1500),
  privacy: z.boolean().refine((val) => val === true),
});
