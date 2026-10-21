import {lesenDatei, schreibenDatei} from './filehandler.js';
import {readFileSync, writeFileSync} from 'node:fs';

const args = getArgumments()


if (args.add) {
    const filePath = './webseiten.json';
    const newObject = {url: args.add};
    addObjectToJsonFile(filePath, newObject);
}

function addObjectToJsonFile(file, obj) {
    try {
        const rawData = readFileSync(file, 'utf8');
        let jsonData;

        try {
            jsonData = JSON.parse(rawData);
        } catch (parseErr) {
            console.error("Fehler beim Parsen der JSON-Datei:", parseErr.message);
            return;
        }

        jsonData.push(obj);

        writeFileSync(file, JSON.stringify(jsonData, null, 2), 'utf8');

        console.log("Objekt erfolgreich hinzugefügt!");
    } catch (err) {
        console.error("Fehler beim Lesen/Schreiben der Datei:", err.message);
    }
}

const webseiten = await lesenDatei('./webseiten.json');

await schreibenDatei('./statuses.log', webseiten);

function getArgumments() {
    let argumente = {}

    if (process.argv.lenght <= 2 ) {
        return;
    }

    const args = process.argv.filter( (element) => element.includes("=") )

    for(const argument of args) {
        const sauberArgument = argument.startsWith("--") ? argument.slice(2) : text;
        const [key, value] = sauberArgument.split("=");
        argumente[key] = value
    }

    return argumente
}