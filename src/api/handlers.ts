import { rest } from "msw";
import { accounts } from "./data/accounts";
import { transactions } from "./data/transactions";

const isTest = process.env.NODE_ENV === "test";
const duration = isTest ? 0 : 2000;

const statusCode = 200;

export const handlers = [
  // this api is almost instant
  rest.get("/api/accounts", (req, res, ctx) => res(ctx.delay(), ctx.status(statusCode), ctx.json(accounts))),
  // this api takes two seconds
  rest.get("/api/transactions", (req, res, ctx) => res(ctx.delay(duration), ctx.status(statusCode), ctx.json(transactions))),
];
