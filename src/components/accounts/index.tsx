import { AccountItem } from "./item";
import "./index.css";
import { accounts } from "../../api/data/accounts";

export const Accounts = () => {
  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      <div className="accounts">
        {accounts.map((account) => (
          <AccountItem account={account} key={account.account_id} />
        ))}
      </div>
    </>
  );
};
