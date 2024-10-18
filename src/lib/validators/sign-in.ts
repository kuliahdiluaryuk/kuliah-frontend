import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  savePassword: z.boolean().default(false).optional(),
});

export type signinPayload = z.infer<typeof signinSchema>;
