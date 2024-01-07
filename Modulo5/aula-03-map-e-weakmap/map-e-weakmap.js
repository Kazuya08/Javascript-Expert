const assert = require('assert');
const myMap = new Map();

// podem ter qualquer coisa como chave
myMap
    .set(1, 'one')
    .set('Kazuya', {text: 'two'})
    .set(true, () => "hello")

// usando um construtor
// const myMapWithConstructor = new Map([
//     ['1', 'str1'],
//     [1, 'num1']
//     [true, 'bool1']
// ])

// console.log('myMap', myMap);
// console.log('myMap.get(1)', myMap.get(1));

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Kazuya'), {text: 'two'});
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// Em Objects a chave so pode ser string ou symbol (number e coergido a string)
//ele funciona com referecia na memoria
const onlyRefenceWorks = {id: 1}
myMap.set(onlyRefenceWorks, { name: "ErickWendel" })

// console.log('get', myMap.get(onlyRefenceWorks))
assert.deepStrictEqual(myMap.get({id: 1}), undefined);
assert.deepStrictEqual(myMap.get(onlyRefenceWorks), { name: "ErickWendel" });

assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se nao existe = undefined
// if() = coercao implicita para boolean e retorna false
// O jeito certo e Object e ({name: 'Erick'}).hasOwnProperty('name')

assert.ok(myMap.has(onlyRefenceWorks));

// para remover um item do objeto
// delete item.id
// imperformatico para o Javascript 
assert.ok(myMap.delete(onlyRefenceWorks))

// Nao da para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Kazuya",{"text":"two"}],[true,() => {}]]));

// for (const [key, value] of myMap){
//     console.log({key, value})
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({ }).toString() === '[object Object]'
// ({toString: () => 'Hey'}).toString() === 'Hey'

//qualquer chave pode colidir, com as propriedades herdadas do objeto, como 
// constructor, toString, valueOf e etc.

const actor = {
    name: "Xuxa da Silva",
    toString: "Queen: Xuxa da Silva"
}

// nao tem restricao de nome de chave
myMap.set(actor);

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Nao da para limpar um objeto sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// --- WeakMap

// Pode ser coletado apos perder as referencias
// usado em casos bem especificos

// tem a maioria dos beneficios do Map
// MAS: nao e iteravel
// So chaves de referencia e que voce ja conheca (referencia da memoria)
// mais leve e preve leak de memoria, pq depois que as instancias saem da memoria, tudo e limpo.

const weakMap = new WeakMap()
const hero = { name: "Flash" }

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.delete(hero);
// weakMap.has(hero);