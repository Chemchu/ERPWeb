import {
  eachDayOfInterval,
  endOfISOWeek,
  endOfMonth,
  startOfISOWeek,
  startOfMonth,
  sub,
} from "date-fns";

export const GetFirstDayOfTheWeek = (date: Date) => startOfISOWeek(date);
export const GetLastDayOfTheWeek = (date: Date) => endOfISOWeek(date);

export const GetFirstDayOfTheLastWeek = () =>
  startOfISOWeek(sub(new Date(), { weeks: 1 }));
export const GetLastDayOfTheLastWeek = () =>
  endOfISOWeek(sub(new Date(), { weeks: 1 }));

export const GetFirstDayOfTheMonth = (date: Date) => startOfMonth(date);
export const GetLastDayOfTheMonth = (date: Date) => endOfMonth(date);

export const GetFirstDayTheLastMonth = () =>
  startOfMonth(sub(new Date(), { months: 1 }));
export const GetLastDayOfTheLastMonth = () =>
  endOfMonth(sub(new Date(), { months: 1 }));

export const GetDaysBetweenDateRange = (
  initDate: Date,
  finalDate: Date
): Date[] => {
  if (initDate.getTime() >= finalDate.getTime()) {
    throw "La fecha inicial no puede ser posterior a la fecha final";
  }

  return eachDayOfInterval({ start: initDate, end: finalDate });
};
