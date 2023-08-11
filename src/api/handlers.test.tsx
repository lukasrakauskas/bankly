import { rest } from "msw";
import { server } from "../../jest.setup";
import { accounts } from "./data/accounts";
import { transactions } from "./data/transactions";

describe("/api/", () => {
  test("/accounts", async () => {
    const response = await fetch("/api/accounts");

    expect(await response.json()).toEqual(accounts);
  });

  test("/transactions", async () => {
    const response = await fetch("/api/transactions");

    expect(await response.json()).toEqual(transactions);
  });
});

describe("An example of playing around with MSW", () => {
  test("expect /api/accounts to return foo", async () => {
    // overwrite the existing api handler with a new one, just for this test
    server.use(
      rest.get("/api/accounts", (req, res, ctx) => res(ctx.status(200), ctx.json("foo"))),
    );

    const response = await fetch("/api/accounts");

    expect(await response.json()).toEqual("foo");
  });
});
