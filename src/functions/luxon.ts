import { DateTime } from "luxon";

export const getDateTime = async (timezone: string) => {
  const dateTime = await DateTime.now().setZone(timezone);
  const date = dateTime.toFormat("yyyy-MM-dd");
  const time = dateTime.toFormat("HH:mm");
  return {
    date,
    time,
  };
};

export const getDateTimeValue = async (timezone: string) => {
  const dateTime = await DateTime.now().setZone(timezone).toISO();
  return dateTime;
};

export const convertDateToLocalTimezone = (date: Date, timezone: string) => {
  return DateTime.fromJSDate(date)
    .setZone(timezone)
    .toFormat("yyyy-MM-dd HH:mm");
};

export const formatFullDate = (date: Date) => {
  return DateTime.fromJSDate(date).toFormat("dd/MM/yyyy HH:mm");
};
