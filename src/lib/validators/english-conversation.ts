import { z } from 'zod'

export const englishConversationSchema = z.object({
  level: z.string({ required_error: 'Please select the level' }).min(1, {
    message: 'Please select the level',
  }),
  topic: z.string({ required_error: 'Please select the topic' }).min(1, {
    message: 'Please select the topic',
  }),
  assistant: z
    .string({ required_error: 'Please select the voice assistant' })
    .min(1, {
      message: 'Please select the voice assistant',
    }),
})

export type englishConversationPayload = z.infer<
  typeof englishConversationSchema
>
