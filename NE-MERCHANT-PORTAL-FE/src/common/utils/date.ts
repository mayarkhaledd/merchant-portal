export function getFullDate(input: string) {
  const date = new Date(input);
  const options: Intl.DateTimeFormatOptions = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
}

export function getDateAndTime(input: string) {
  const date = new Date(input);
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "UTC",
  };
  const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(
    date,
  );
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    date,
  );

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
