export type TResults = Record<string, string[]>;
export type TTableData = {
  data: {
    validColors: string[];
    validWidths: string[];
    colorResults: TResults;
    widthResults: TResults;
  } | null;
};

export interface IGetTableDataProps {
  privateKey: string | undefined;
  spreadsheetId: string | undefined;
  range: string | undefined;
  clientId: string | undefined;
  clientEmail: string | undefined;
}

export type TSelectedParam = "width" | "color";
