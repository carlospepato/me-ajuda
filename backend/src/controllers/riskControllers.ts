import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../utils/prisma";
import z from "zod";

const riskSituationSchema = z.object({
  riskSituationId: z.number()
})

type RiskSituationRequest = FastifyRequest<{
  Params: z.infer<typeof riskSituationSchema>
}>

async function getRiskSituations(request: FastifyRequest, reply: FastifyReply) {
  const riskSituations = await prisma.riskSituation.findMany();
  return reply.status(200).send({
    message: 'List of risk situations',
    riskSituations: riskSituations
  });
}

async function getRisk(request: RiskSituationRequest, reply: FastifyReply) {
  const risk = await prisma.risk.findMany({
    where: {
      riskSituationId: request.params.riskSituationId
    }
  });
  if (risk.length === 0) {
    return reply.status(404).send({
      message: 'Risk situation not found'
    });
  }
  return reply.status(200).send({
    message: 'Risk situation found',
    risk: risk
  });
}

export { getRiskSituations, getRisk }
