import z from "zod";

export const donationItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  measure: z.string(),
  wasDonated: z.boolean().default(false),
});

export const createDonationListSchema = {
  params: z.object({
    userId: z.string(),
  }),
  body: z.object({
    listName: z.string(),
    donations: z.array(donationItemSchema),
  }),
  response: {
    201: z.object({
      message: z.literal('Donation List created'),
      donationList: z.object({
        id: z.string(),
        listName: z.string(),
        userId: z.string(),
        donations: z.array(donationItemSchema.extend({
          id: z.string(),
          listId: z.string(),
        })),
      }),
    }),
    400: z.object({
      message: z.literal('Invalid input'),
    }),
  },
};
