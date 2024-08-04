import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { config } from '../config/config';
import { panicRoutes } from './routes/panicRoutes';
import { riskRoutes } from './routes/riskRoutes';

const server = Fastify({ logger: true });
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);


server.register(riskRoutes);
server.register(panicRoutes);

server.listen({ port: config.port }).then(() => {
  console.log(`Server is running on port ${config.port}`);
});
