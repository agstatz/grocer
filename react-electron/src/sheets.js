import { google } from 'googleapis';
import React from "react";

export async function getProps() {

    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth});

    const range = "Sheet1!A1:E26";

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range
    });

    const return_values = response.data.values[0];

    console.log(return_values);

    return {
        return_values
    }
}

export default function Post() {
    return (
        <div>
            Bing bong
        </div>
    )
}