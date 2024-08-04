import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { createPanicFunction } from "../services/panicFunctionService";

const PanicFunctionSchema = z.object({
  typeRisk: z.string(),
  city: z.string(),
  concluded: z.boolean().default(false),
  riskAlertId: z.string().optional(),
})

type PanicRequest = FastifyRequest<{
  Body: z.infer<typeof PanicFunctionSchema>
}>

async function createPanic(request: PanicRequest, reply: FastifyReply) {
  const { typeRisk, city, concluded, riskAlertId } = request.body;

  const result = await createPanicFunction({ typeRisk, city, concluded, riskAlertId });
  
  return reply.status(201).send(result);
}

export { createPanic }
