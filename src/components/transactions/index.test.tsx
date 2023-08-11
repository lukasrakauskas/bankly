import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { TransactionHistory } from ".";
import { createWrapper } from "../../tests/wrapper";
import { server } from "../../../jest.setup";
import { rest } from "msw";
import { transactions } from "../../api/data/transactions";

describe("transaction history", () => {
  test("the expenses tab should be shown by default", () => {
    render(<TransactionHistory />, { wrapper: createWrapper() });

    expect(screen.getByText("Transaction History")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });

    waitFor(() => expect(expensesTable).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("-20.25")).toBeInTheDocument());
  });

  test("show loading state before transactions are shown", () => {
    server.use(
      rest.get("/api/transactions", (req, res, ctx) =>
        res(ctx.delay(1000), ctx.status(200), ctx.json(transactions))
      )
    );

    render(<TransactionHistory />, { wrapper: createWrapper() });

    expect(
      screen.getByRole("table", {
        name: "Expenses",
      })
    ).toBeInTheDocument();

    expect(screen.getByTestId("tbody").childNodes.length).toBe(3);

    waitFor(() =>
      expect(screen.getByTestId("tbody").childNodes.length).not.toBe(3)
    );
    waitFor(() => expect(screen.getByText("-20.25")).toBeInTheDocument());
  });

  test("show error state when request fails", () => {
    server.use(
      rest.get("/api/transactions", (req, res, ctx) =>
        res(ctx.status(400), ctx.json(transactions))
      )
    );

    render(<TransactionHistory />, { wrapper: createWrapper() });

    expect(
      screen.getByRole("table", {
        name: "Expenses",
      })
    ).toBeInTheDocument();

    waitFor(() => expect(screen.getByTestId("error")).toBeInTheDocument());
  });

  test("changing between the expenses and income tabs should show different transactions", () => {
    render(<TransactionHistory />, { wrapper: createWrapper() });

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });
    const incomeTabTrigger = screen.getByRole("tab", {
      name: "Income",
    });
    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });
    const incomeTable = screen.queryByRole("table", {
      name: "Income",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(incomeTable).not.toBeInTheDocument();

    waitFor(() => expect(screen.getByText("-20.25")).toBeInTheDocument());

    fireEvent.click(incomeTabTrigger);

    waitFor(() =>
      expect(incomeTabTrigger).toHaveAttribute("data-state", "active")
    );
    waitFor(() =>
      expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive")
    );
    expect(screen.queryByText("-20.25")).not.toBeInTheDocument();
  });
});
