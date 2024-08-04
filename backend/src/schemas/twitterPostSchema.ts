import z from "zod";

export const twitterPostSchema = {
  params: z.object({
    riskAlertId: z.string(),
  }),
  body: z.object({
    content: z.string(),
    date: z.string(),
  }),
  response: z.object({
    201: z.object({
      message: z.literal('Twitter post created'),
      twitterPost: z.object({
        id: z.string(),
        riskAlertId: z.string(),
        content: z.string(),
        date: z.string(),
      }),
    }),
    400: z.object({
      message: z.literal('Invalid input'),
    }),
  })
}