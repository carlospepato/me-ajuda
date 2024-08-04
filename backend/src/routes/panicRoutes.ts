import { FastifyInstance } from "fastify";
import { createPanic } from "../controllers/panicControllers";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createPanicFunctionSchema } from "../schemas/panicFunctionSchema";

export async function panicRoutes(server: FastifyInstance){
  server.withTypeProvider<ZodTypeProvider>().post('/panic', {
    schema: createPanicFunctionSchema
  },createPanic)
}