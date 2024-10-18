import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required",
  }),
});

export type checkoutPayload = z.infer<typeof checkoutSchema>;
