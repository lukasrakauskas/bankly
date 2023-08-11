import { AccountItem } from "./item";
import { useQuery } from "@tanstack/react-query";
import { accountSchema } from "../../schemas/account";
import "./index.css";

export const Accounts = () => {
  const { data: accounts = [] } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await fetch("/api/accounts");
      const data = await response.json();
      return accountSchema.array().parse(data);
    },
  });

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      <div className="accounts">
        {accounts.map((account) => (
          <AccountItem account={account} key={account.accountId} />
        ))}
      </div>
    </>
  );
};
