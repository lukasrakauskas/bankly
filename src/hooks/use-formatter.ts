const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
});

const currencies = ["GBP", "EUR", "USD"] as const;
export type Currency = (typeof currencies)[number];

const currencyFormatters = currencies.reduce<Record<string, Intl.NumberFormat>>(
  (current, currency) => ({
    ...current,
    [currency]: new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }),
  }),
  {}
);

export const useFormatter = () => {
  if (process.env.NODE_ENV === "test") {
    return {
      formatDate: (it: string) => it,
      formatCurrency: (it: number) => it.toString(),
    };
  }

  const formatDate = (date: string) => dateFormatter.format(new Date(date));
  const formatCurrency = (amount: number, currency: Currency = "GBP") =>
    currencyFormatters[currency].format(amount);

  return {
    formatDate,
    formatCurrency,
  };
};
