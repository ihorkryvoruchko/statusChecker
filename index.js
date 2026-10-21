import {lesenDatei, schreibenDatei} from './filehandler.js';


const args = getArgumments()
const webseiten = await lesenDatei('./webseiten.json');

if (args.add) {
    webseiten.push({"url": args.add})
}

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