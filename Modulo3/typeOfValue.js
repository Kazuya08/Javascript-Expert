let counter = 0;
let counter2 = counter;
counter2++;
// ?

const item = { counter: 0 };
const item2 = item;

// tipo de primitivo gera uma cópia em memória;
if (counter === 0) {
  console.log("counter é igual a 0");
}

if (counter2 === 1) {
  console.log("counter2 é igual a 1");
}

// tipo de referência, copia o endereço de memória
// e aponta para o mesmo lugar
item2.counter++;
if (item === { counter: 1 }) {
  console.log("item é igual a { counter: 1 }");
}

item.counter++;
if (item2 === { counter: 1 }) {
  console.log("item2 é igual a { counter: 1 }");
}
