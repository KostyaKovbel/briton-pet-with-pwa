import { TResults } from "../types";

export const processData = (items: string[][] | undefined | null) => {
  if (!items || !Array.isArray(items) || items.length < 2) {
    return null;
  }

  const [headingLine, ...mainTable] = items;

  const validColors: string[] = [];
  const validWidths: string[] = headingLine ? headingLine.slice(1) : [];
  const widthResults: TResults = {};

  validWidths.forEach((el) => {
    if (!widthResults[el]) {
      widthResults[el] = [];
    }
  });

  const colorResults: TResults = mainTable.reduce((acc, item) => {
    const [title] = item;
    validColors.push(title);

    const widths = headingLine.filter((_, index) => Number(item[index]));

    widths.forEach((el) => widthResults[el].push(title));

    return {
      ...acc,
      [title]: widths,
    };
  }, {});

  return {
    validColors,
    validWidths,
    colorResults,
    widthResults,
  };
};
