import { format, isToday, isYesterday } from "date-fns";
import { es } from "date-fns/locale";

const getToday = (lang: string) => {
  return lang === "es" ? "Hoy" : "Today";
};

const getYesterday = (lang: string) => {
  return lang === "es" ? "Ayer" : "Yesterday";
};

export const formatFullDate = (date: Date, lang: string) => {
  return `${isToday(date) ? getToday(lang) : isYesterday(date) ? getYesterday(lang) : format(date, "MMM d, yyyy", lang === "es" ? { locale: es } : {})} - ${format(date, "h:mm a", lang === "es" ? { locale: es } : {})}`;
};

export const formatDate = (date: Date, lang: string) => {
  return `${isToday(date) ? getToday(lang) : isYesterday(date) ? getYesterday(lang) : format(date, "MMMM d, yyyy", lang === "es" ? { locale: es } : {})}`;
};

export const formatDateWithDayOfWeek = (date: Date, lang: string) => {
  return `${isToday(date) ? getToday(lang) : isYesterday(date) ? getYesterday(lang) : format(date, `EEEE d, '${lang === "es" ? "de" : "of"}' MMMM - yyyy`, lang === "es" ? { locale: es } : {})}`;
};

export const formatDateWithTime = (date: Date, lang: string) => {
  return `${isToday(date) ? getToday(lang) : isYesterday(date) ? getYesterday(lang) : format(date, "MMM d, yyyy", lang === "es" ? { locale: es } : {})} - ${format(date, "h:mm a", lang === "es" ? { locale: es } : {})}`;
};

export const formatDateComplete = (date: Date, lang: string) => {
  return format(date, "yyyy-MM-dd", lang === "es" ? { locale: es } : {});
};

export const simpleFormatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export const formatDatePicker = (date: Date, lang: string) => {
  return format(date, "MMMM d, yyyy", lang === "es" ? { locale: es } : {});
};

// Parse date string safely without timezone offset
export const getLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("T")[0].split("-").map(Number);
  return new Date(year, month - 1, day);
};
