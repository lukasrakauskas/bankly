const dateFormatter = new Intl.DateTimeFormat("en-GB");
const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export const useFormatter = () => {
  if (process.env.NODE_ENV === "test") {
    return {
      formatDate: (it: string) => it,
      formatCurrency: (it: number) => it.toString(),
    };
  }

  const formatDate = (date: string) => dateFormatter.format(new Date(date));
  const formatCurrency = (amount: number) => currencyFormatter.format(amount);

  return {
    formatDate,
    formatCurrency,
  };
};
