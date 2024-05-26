import { DateType } from "react-tailwindcss-datepicker";

export function convertDateToUnix(d: DateType): number | null {
  if (typeof d !== "string") return null;
  return parseInt((new Date(d).getTime() / 1000).toFixed(0));
}
