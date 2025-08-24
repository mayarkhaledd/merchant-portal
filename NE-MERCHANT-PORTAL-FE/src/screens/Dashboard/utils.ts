export function formattingMonth(date: Date) {
  const pad = (num: number) => num.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

interface FormatMoneyOptions {
  currency?: string;
  decimals?: number;
  locale?: string;
}

export function formatMoney(
  amount: number,
  options: FormatMoneyOptions = {},
): string {
  const { currency = "SAR", decimals = 2, locale = "en-SA" } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}
