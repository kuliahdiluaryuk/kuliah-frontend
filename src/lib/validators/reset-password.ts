import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
});

export type resetPasswordPayload = z.infer<typeof resetPasswordSchema>;
