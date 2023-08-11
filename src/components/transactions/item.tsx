import type { Transaction as TransactionType } from "../../schemas/transaction";
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

export const LoadingTransaction = () => (
  <tr>
    <td>
      <div className="transaction-detail">
        <Avatar name="?" />
        <div className="transaction-description">
          <span className="skeleton skeleton-text" />
          <div className="transaction-category">
            <span className="skeleton skeleton-text skeleton__medium" />
          </div>
        </div>
      </div>
    </td>
    <td>
      <div>
        <span className="skeleton skeleton-text" />
      </div>
    </td>
    <td className="transaction-amount">
      <div className="amount">
        <span className="skeleton skeleton-text" />
      </div>
    </td>
  </tr>
);
