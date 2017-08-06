import * as WebRequest from 'web-request';

// Highscore contains methods to access a server-side highscore list.
export namespace Highscore {
    // Entry is a highscore entry
    export interface Entry {
        name: string
        score: number
    }

    // Table represents the highscore table.
    export interface Table {
        list: Array<Entry>
    }

    // top fetches the highscore list from the server.
    export async function top(): Promise<Array<Entry>> {
        try {
            let url = document.URL.replace("index.html", "highscore");
            let body = await WebRequest.json<Table>(url);
            return body.list
        } catch (e) {
            return []
        }
    }

    // submit a tentative score to the server.
    export async function submit(entry : Entry): Promise<boolean> {
        try {
            let url = document.URL.replace("index.html", "highscore");
            let resp = await WebRequest.post(url, { json: true }, entry);
            return true;
        } catch (e) {
            return false;
        }
    }
}