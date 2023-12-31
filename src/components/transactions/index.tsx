import * as Tabs from "@radix-ui/react-tabs";
import { Transaction as TransactionType } from "../../schemas/transaction";
import { LoadingTransaction, Transaction } from "./item";
import { useQuery } from "@tanstack/react-query";
import { transactionSchema } from "../../schemas/transaction";
import "./index.css";

const isExpense = (transaction: TransactionType) =>
  transaction.amount.value < 0;
const isIncome = (transaction: TransactionType) => transaction.amount.value > 0;

const splitTransactions = (transactions: TransactionType[]) => {
  return transactions.reduce<{
    expenses: TransactionType[];
    incomes: TransactionType[];
  }>(
    (current, transaction) => {
      if (isIncome(transaction)) {
        return {
          ...current,
          incomes: [...current.incomes, transaction],
        };
      }

      if (isExpense(transaction)) {
        return {
          ...current,
          expenses: [...current.expenses, transaction],
        };
      }

      return current;
    },
    { expenses: [], incomes: [] }
  );
};

type Props = React.HTMLAttributes<HTMLTableElement> & {
  transactions: TransactionType[];
  isLoading?: boolean;
  isError?: boolean;
};

const TransactionList = ({
  transactions,
  isLoading,
  isError,
  ...props
}: Props) => {
  return (
    <table {...props}>
      <thead>
        <tr>
          <th className="description">Description</th>
          <th className="date">Date</th>
          <th className="amount">Amount</th>
        </tr>
      </thead>
      <tbody data-testid="tbody">
        {isError ? (
          <tr className="error" data-testid="error">
            <td colSpan={3}>Failed to load your transactions</td>
          </tr>
        ) : isLoading ? (
          <>
            <LoadingTransaction />
            <LoadingTransaction />
            <LoadingTransaction />
          </>
        ) : (
          transactions?.map((transaction) => (
            <Transaction transaction={transaction} key={transaction.id} />
          ))
        )}
      </tbody>
    </table>
  );
};

export const TransactionHistory = () => {
  const {
    data: transactions = { expenses: [], incomes: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await fetch("/api/transactions");

      if (!response.ok) {
        throw new Error("Failed to load transactions");
      }

      const data = await response.json();
      const parsedData = transactionSchema.array().parse(data);
      return splitTransactions(parsedData);
    },
  });

  return (
    <section className="transaction-section">
      <h1 className="title align-left">Transaction History</h1>
      <Tabs.Root defaultValue="expenses" className="tabs">
        <Tabs.List className="tabs__list" aria-label="Filter your transactions">
          <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
          <Tabs.Trigger value="income">Income</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className="tabs__content" value="expenses">
          <TransactionList
            transactions={transactions.expenses}
            isLoading={isLoading}
            isError={isError}
            aria-label="Expenses"
          />
        </Tabs.Content>
        <Tabs.Content className="tabs__content" value="income">
          <TransactionList
            transactions={transactions.incomes}
            isLoading={isLoading}
            isError={isError}
            aria-label="Income"
          />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
};
