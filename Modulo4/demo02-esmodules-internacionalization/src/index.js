import TerminalController from "./terminalController.js";

import database from "./../database.json" assert { type: "json" };
import Person from "./person.js";

const DEFAULT_LANG = 'pt-BR'
const STOP_TERM = ":q"

// const table = chalkTable(options, database.map(item => new Person(item).formatted(DEFAULT_LANG)));
// const print = console.draft(table);
// setInterval(() => {
//   database.push({ id: Date.now(), vehicles: ["Test" + Date.now()] });
//   const table = chalkTable(options, database);
//   print(table);
// }, 400);

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)


async function mainLoop() {
  try {
    const answer = await terminalController.question()
    console.log(answer, 'answer')

    if(answer === STOP_TERM){
      terminalController.closeTerminal()
      console.log('process finished!')
      return;
    }
    const person = Person.generateInstanceFromString(answer)
    console.log('new person', person.formatted(DEFAULT_LANG)) 
    return mainLoop()
  } catch (error) {
    console.log('DEU RUIM**', error)
    return mainLoop()
  }
}

await mainLoop()