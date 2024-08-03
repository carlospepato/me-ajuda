import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from './utils/prisma';

const server = Fastify({ logger: true });
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.withTypeProvider<ZodTypeProvider>().get('/users', {
  schema: {
    response: {
      200: z.object({
        message: z.literal('List of users'),
        users: z.array(z.object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
          phone: z.string(),
          address: z.string(),
        }))
      })
    }
  }
}, async (request, reply) => {
  const users = await prisma.user.findMany();

  reply.status(200).send({
    message: 'List of users',
    users
  });
});

const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
});

const responseSchema201 = z.object({
  message: z.literal('User created'),
  user: createUserSchema.extend({
    id: z.string(),
  }),
});

const responseSchema400 = z.object({
  message: z.literal('Invalid input'),
});

server.withTypeProvider<ZodTypeProvider>().post('/user', {
  schema: {
    body: createUserSchema,
    response: {
      201: responseSchema201,
      400: responseSchema400,
    },
  },
}, async (request, reply) => {
  const parsedBody = createUserSchema.safeParse(request.body);

  if (!parsedBody.success) {
    return reply.status(400).send({ message: 'Invalid input' });
  }

  const { name, email, phone, address } = parsedBody.data;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      address,
    },
  });

  reply.status(201).send({
    message: 'User created',
    user: newUser,
  });
});

server.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333');
});
