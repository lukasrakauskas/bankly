import { z } from "zod";

export const transactionSchema = z.object({
  id: z.string(),
  date: z.string(),
  description: z.string(),
  category: z.string(),
  amount: z
    .object({
      value: z.number(),
      currency_iso: z.string(),
    })
    .transform((it) => ({ value: it.value, currencyIso: it.currency_iso })),
});

export type Transaction = z.infer<typeof transactionSchema>;
export type RawTransaction = z.input<typeof transactionSchema>;
