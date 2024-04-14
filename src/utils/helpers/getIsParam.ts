import { TSelectedParam } from "../types";

export const getIsParam = (
  param: string | undefined | null | string[]
): param is TSelectedParam =>
  !!param && (param === "color" || param === "width");
