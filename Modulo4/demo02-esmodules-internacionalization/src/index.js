import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readline from "readline";

import database from "./../database.json" assert { type: "json" };

// console.log("database", database);

DraftLog(console).addLineListener(process.stdin);

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.magenta("Vehicles") },
    { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
    { field: "from", name: chalk.green("From") },
    { field: "to", name: chalk.yellow("To") },
  ],
};

const table = chalkTable(options, database);
const print = console.draft(table);
// setInterval(() => {
//   database.push({ id: Date.now(), vehicles: ["Test" + Date.now()] });
//   const table = chalkTable(options, database);
//   print(table);
// }, 400);

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

terminal.question("Qual é o seu nome?", (msg) => {
  console.log("msg", msg.toString());
});
