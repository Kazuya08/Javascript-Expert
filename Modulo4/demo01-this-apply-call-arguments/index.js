"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this this", this);
    // console.log("arguments", arguments);
    console.log("arguments", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

// watch(__filename, async (event, filename) => {
//   // console.log("index.js!", event, filename);
//   console.log((await readFile(filename)).toString());
// });

const file = new File();
// dessa form, ele ignora o 'this' da classe File
//herda o this do watch!
// watch(__filename, file.watch());

// alternativa para nao herdar o this da funcao
// mas fica feio!
// watch(__filename, (event, filename) => file.watch(event, filename));

//podemos deixar explicito qual [e o contexto que a funcao deve seguir
// o bind retorna uma funcao com o 'this' que se mantem de file, ignorando o watch
// watch(__filename, file.watch.bind(file));

// a diferenca entre um e outro, e que um voce passa os argumentos como array e outro uma lista de argumentos
file.watch.call(
  { showContent: () => console.log("call: hey sinon!", 1 + 1) },
  null,
  __filename
);

file.watch.apply(
  { showContent: () => console.log("apply: hey sinon!", 1 + 1) },
  [null, __filename]
);

// class Test {
//   testFunc() {
//     this.testFunc2();
//   }

//   testFunc2() {
//     console.log("entrou na func testFunc2!");
//   }
// }

// const test = new Test();

// test.testFunc.call({
//   testFunc: () => console.log("chamou o call da class Test"),
// });
