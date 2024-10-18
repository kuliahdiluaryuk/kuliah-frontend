import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must contain at least 8 character(s)",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required",
  }),
  birth: z.string().min(8, {
    message: "Please enter your birth date.",
  }),
  major: z.string().min(1, {
    message: "Major is required",
  }),
  isAboard: z.boolean(),
  country: z.string(),
  referral: z.string().optional(),
  agree: z
    .boolean({
      required_error: "Please read and accept the terms and conditions",
    })
    .refine((val) => val === true, {
      message: "Please read and accept the terms and conditions",
    }),
});

export type signupPayload = z.infer<typeof signupSchema>;
