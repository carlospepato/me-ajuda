
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getRiskSituations, getRisk } from "../controllers/riskControllers";
import { getRiskSituationSchema, getRiskSchema } from "../schemas/riskSituationsSchema";

export async function riskRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().get('/risks-situation', {
    schema: getRiskSituationSchema
  }, getRiskSituations);

  server.withTypeProvider<ZodTypeProvider>().get('/risks/:riskSituationId', {
    schema: getRiskSchema
  }, getRisk);
}
