import {readFile, appendFile} from 'node:fs/promises';
import {lookup} from 'dns/promises';

export async function lesenDatei(dateiname, ) {
    const text = await readFile(dateiname, 'utf-8');
    return JSON.parse(text);
}

export async function schreibenDatei(dateiname, inhalt) {
    inhalt.forEach(async (webseite) => {
        const start = Date.now();
        const response = await fetch(webseite.url);
        const end = Date.now();
        const status = response.status;
        const url = response.url;
        const heute = new Date().toLocaleDateString();
        const { address, family } = await getIp(webseite.url);
            
        appendFile(dateiname, `${heute} - ${url} - ${status} - ${address} - ${family} - ${end-start}ms\n`);
    })
}

async function getIp(url) {
    return await lookup(new URL(url).hostname)
}