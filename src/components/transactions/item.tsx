import type { Transaction as TransactionType } from "../../../types";
import { Avatar } from "./avatar";

type Props = {
  transaction: TransactionType;
};

export const Transaction = ({ transaction }: Props) => (
  <tr>
    <td>
      <div className="transaction-detail">
        <Avatar name={transaction.description} />
        <div className="transaction-description">
          {transaction.description}
          <div className="transaction-category">{transaction.category}</div>
        </div>
      </div>
    </td>
    <td>
      <div>{transaction.date}</div>
    </td>
    <td className="transaction-amount">
      <div className="amount">{transaction.amount.value}</div>
    </td>
  </tr>
);
