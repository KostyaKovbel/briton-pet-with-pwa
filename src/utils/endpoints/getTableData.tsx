import { google } from "googleapis";
import { IGetTableDataProps } from "../types";

export const getTableData = async ({
  privateKey,
  spreadsheetId,
  range,
  clientId,
  clientEmail,
}: IGetTableDataProps) => {
  try {
    const auth = await google.auth.getClient({
      projectId: "briton-qr",
      credentials: {
        type: "service_account",
        private_key: privateKey?.replace(/\\n/g, "\n"),
        client_email: clientEmail,
        client_id: clientId,
        token_url: "https://oauth2.googleapis.com/token",
        universe_domain: "googleapis.com",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const data = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    if (!data) {
      return null;
    }

    return data.data.values as unknown as string[][];
  } catch {
    return null;
  }
};
