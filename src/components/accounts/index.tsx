import { AccountItem, LoadingAccountItem } from "./item";
import { useQuery } from "@tanstack/react-query";
import { accountSchema } from "../../schemas/account";
import "./index.css";

export const Accounts = () => {
  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await fetch("/api/accounts");
      const data = await response.json();
      return accountSchema.array().parse(data);
    },
  });

  if (isLoading) {
    return (
      <>
        <h1 className="align-left">Your accounts</h1>
        <div className="accounts">
          <LoadingAccountItem />
          <LoadingAccountItem />
          <LoadingAccountItem />
        </div>
      </>
    );
  }

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
