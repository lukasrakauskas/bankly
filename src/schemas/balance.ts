import { z } from "zod";

export const balanceSchema = z.object({
  amount: z.object({
    currency: z.string(),
    value: z.number(),
  }),
});

export type Balance = z.infer<typeof balanceSchema>;
