const { describe, it } = require('mocha')
const { expect } = require('chai')
const { InvalidRegexError, evaluateRegex } = require('./../src/util')


describe('Util', () => {
    it('#evaluateRegex should throw an error usin an unsafe regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s)+$/
        /*
        // fica rodando em loop e quebra tudo!
        catastrophic backtracking!
        time \
        node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai voce e como vai voce e como vai voce?') && console.log('legalzin')"
        */
        expect(() => evaluateRegex(unsafeRegex).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`))
    })

    it('#evaluateREgex should not throw an error using a safe regex', () => {
        const safeRegex = /^([a-a])$/
        expect(() => evaluateRegex(safeRegex)).to.not.throw
        expect(evaluateRegex(safeRegex)).to.be.ok
    })
})