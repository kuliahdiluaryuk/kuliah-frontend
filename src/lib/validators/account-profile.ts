import { z } from "zod";

export const accountProfileSchema = z.object({
  picture: z
    //Rest of validations done via react dropzone
    .instanceof(File)
    .optional(),
  // .refine((file) => file.size !== 0, "Please upload an image"),
  fullname: z.string().min(1, {
    message: "Required",
  }),
  email: z.string().email(),
  major: z.string().min(1, {
    message: "Required",
  }),
  phone: z.string().min(1, {
    message: "Required",
  }),
  birth: z.string().min(1, {
    message: "Required",
  }),
  language: z.string().min(1, {
    message: "Required",
  }),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export type accountProfilePayload = z.infer<typeof accountProfileSchema>;