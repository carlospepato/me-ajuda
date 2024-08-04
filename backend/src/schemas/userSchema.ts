import z from "zod";

export const getAllUsers = {
  response:{
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

export const createUser = {
  body: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
  response: {
    201: z.object({
      message: z.literal('User created'),
      user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
      })
    }),
    400: z.object({
      message: z.literal('Invalid input'),
    })
  }
}