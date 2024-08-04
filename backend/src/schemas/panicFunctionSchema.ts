import z from "zod";

export const createPanicFunctionSchema = {
  body: z.object({
    typeRisk: z.string(),
    city: z.string(),
    concluded: z.boolean().default(false),
    riskAlertId: z.string().optional(),
  }),
  response: {
    201: z.object({
      message: z.literal('Panic function created'),
      panicFunction: z.object({
        id: z.string(),
        city: z.string(),
        typeRisk: z.string(),
        date: z.string(),
        concluded: z.boolean(),
        riskAlertId: z.string().nullable(),
      }),
    }),
    400: z.object({
      message: z.literal('Invalid input'),
    }),
  },
};

export const createRiskAlertSchema = {
  body: z.object({
    typeRisk: z.string(),
    city: z.string(),
    triggerCount: z.number(),
    triggerAt: z.date(),
  }),
  response: z.object({
    201: z.object({
      message: z.literal('Risk alert created'),
      riskAlert: z.object({
        id: z.string(),
        typeRisk: z.string(),
        city: z.string(),
        triggerCount: z.number(),
        triggerAt: z.date(),
      }),
    }),
    400: z.object({
      message: z.literal('Invalid input'),
    }),
  }),
}