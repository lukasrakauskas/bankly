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
};

const TransactionList = ({ transactions, isLoading, ...props }: Props) => {
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
        {isLoading ? (
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
  const { data: transactions = { expenses: [], incomes: [] }, isLoading } =
    useQuery({
      queryKey: ["transactions"],
      queryFn: async () => {
        const response = await fetch("/api/transactions");
        const data = await response.json();
        const parsedData = transactionSchema.array().parse(data);
        return splitTransactions(parsedData);
      },
    });

  return (
    <>
      <h1 className="align-left">Transaction History</h1>
      <Tabs.Root defaultValue="expenses" className="flow">
        <Tabs.List className="tabs__list" aria-label="Filter your transactions">
          <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
          <Tabs.Trigger value="income">Income</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className="TabsContent" value="expenses">
          <TransactionList
            transactions={transactions.expenses}
            isLoading={isLoading}
            aria-label="Expenses"
          />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="income">
          <TransactionList
            transactions={transactions.incomes}
            isLoading={isLoading}
            aria-label="Income"
          />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};
