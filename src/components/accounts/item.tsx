import { useFormatter } from "../../hooks/use-formatter";
import type { Account } from "../../schemas/account";
import "./index.css";

type Props = {
  account: Account;
};

export const AccountItem = ({ account }: Props) => {
  const { formatCurrency } = useFormatter();

  return (
    <div className="account">
      <div className="total">Total {account.balance.amount.currency}</div>
      <strong className="amount">
        {formatCurrency(
          account.balance.amount.value,
          account.balance.amount.currency
        )}
      </strong>
    </div>
  );
};

export const LoadingAccountItem = () => {
  return (
    <div className="account">
      <div className="total">
        Total <span className="skeleton skeleton-text skeleton__small" />
      </div>
      <strong className="amount skeleton skeleton-text"></strong>
    </div>
  );
};
