import {readFile} from 'node:fs/promises';
import {lookup} from 'dns/promises';

const text = await readFile('./webseiten.json', 'utf-8');

const webseiten = JSON.parse(text);

webseiten.forEach(async (webseite) => {
    const start = Date.now();
    const response = await fetch(webseite.url);
    const end = Date.now();
    const status = response.status;
    const url = response.url;
    const heute = new Date().toLocaleDateString();
    const { address, family } = await lookup(new URL(url).hostname);
            
    console.log(heute, url, status, address);
        
})
