9999999999999999 // 16
//10000000000000000
true + 2 
// 3
'21' + true
// '21true'
'21' - true
//20
'21' - - 1
//22
0.1 + 0.2 === 0.3
//false

3 > 2 > 1
// false
3 > 2 >= 1
//true

'B' + 'a' + + "a" + "a"
// 'BaNaNa'

'1' == 1
//true

'1' === 1
//false

//https://wtfjs.com/

// ------------------------------------

String(123)
//'123'

123 + ''
//'123'

console.assert(String(123) === '123', "explicit convertion to string")
console.assert(123 + "" === "123", "implicit convertion to string")

// const r = 'hello' || 1
// console.log('r', r) //return a primeira expressão

// if (r) {
//     console.log('ae!2')
// }

console.assert(('hello' || 123) === 'hello', "|| returns the first element!")
//sempre retornara o primeiro elemento se os dois forem true

console.assert(('hello' && 123) === 123, "&& returns the last element!")

//---------------------------------

const item = {
    name: "Thiago Kazuya",
    age: 22, 
    // string: 1 se nao for primitivo, chama o valueOf
    toString() {
        return `Name: ${this.name}, Age: ${this.age} `
    },
    // number: 1 se nao for primitivo, chama o toString
    valueOf() {
        return { hey: 'dude' }
        // return 007
    },
    [Symbol.toPrimitive](coercionType) {
        console.log('trying to convert to', coercionType)
        const types = {
            string: JSON.stringify(this),
            number: "007"
        }
        // console.log((types[coercionType] || types.string), "teste")
        return types[coercionType] || types.string
    }
}

// console.log('toString', String(item)) 
// // vai retornar NaN pois o toString retornou a string
// console.log('valueOf', Number(item))

// console.log('item', "".concat(item))

// depois de adicionar o toPrimitive
// console.log('String', String(item))
// console.log('Number', Number(item))
// //chama a conversao default!
// console.log('Date', new Date(item))


console.assert(item + 0 === '{"name":"Thiago Kazuya","age":22}0', "error")
// console.log('!!item is true?', !!item)
console.assert(!!item)
// console.log('String.concat', 'Ae'.concat(item))
console.assert('Ae'.concat(item) === 'Ae{"name":"Thiago Kazuya","age":22}')

// console.log('implicit + explicit coercion (using ==)', item == String(item))
console.assert(item == String(item) === true)

const item2 = { ...item, name: "Zezin", age: 26 }
// console.log('New Object', item2)
console.assert(item2.name === "Zezin" && item2.age === 26)