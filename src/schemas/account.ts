import { z } from "zod";

import { balanceSchema } from "./balance";

export const accountSchema = z
  .object({
    account_id: z.string(),
    balance: balanceSchema,
  })
  .transform((it) => ({
    accountId: it.account_id,
    balance: it.balance,
  }));

export type Account = z.infer<typeof accountSchema>;
export type RawAccount = z.input<typeof accountSchema>;
