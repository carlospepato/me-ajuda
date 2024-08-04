import z from "zod";

export const getRiskSituationSchema = {
  response:{
    200: z.object({
      message: z.literal('List of risk situations'),
      riskSituations: z.array(z.object({
        id: z.number(),
        type: z.string(),
      }))
    })
  }
}

export const getRiskSchema = {
  params: z.object({
    riskSituationId: z.string().transform(Number),
  }),
  response:{
    200: z.object({
      message: z.literal('Risk situation found'),
      risk: z.array(z.object({
        id: z.number(),
        riskSituationId: z.number(),
        cause: z.string(),
        solution: z.string(),
      }))
    }),
    404: z.object({
      message: z.literal('Risk situation not found'),
    })
  }
}