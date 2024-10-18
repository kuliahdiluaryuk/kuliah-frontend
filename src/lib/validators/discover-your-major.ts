import { z } from 'zod'

export const discoverYourMajorSchema = z.object({
  name: z.string().min(1, {
    message: 'Required',
  }),
  email: z.string().email(),
  phone: z.string().min(1, {
    message: 'Required',
  }),
  edu_background: z.string().min(1, {
    message: 'Required',
  }),
  favorite_subject: z.string().min(1, {
    message: 'Required',
  }),
  favorite_activities: z.string().min(1, {
    message: 'Required',
  }),
  strongest_skills: z.string().min(1, {
    message: 'Required',
  }),
  inspiration: z.string().min(1, {
    message: 'Required',
  }),
  specific_environment: z.string().min(1, {
    message: 'Required',
  }),
  career_impact: z.string().min(1, {
    message: 'Required',
  }),
  passionate_challenges: z.string().min(1, {
    message: 'Required',
  }),
  emerging_trends: z.string().min(1, {
    message: 'Required',
  }),
})

export type discoverYourMajorPayload = z.infer<typeof discoverYourMajorSchema>
