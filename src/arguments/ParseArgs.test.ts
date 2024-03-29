import { describe, test, expect } from 'vitest'
import { parseArgs } from './ParseArgs'
import stringArgv from 'string-argv'

describe('ParseArgs', () => {
    test('Empty', () => {
        expect(parseArgs(stringArgv(''))).eql({})
    })

    test('Single with value', () => {
        expect(parseArgs(stringArgv('--name=foo'))).eql({ name: 'foo' })
        expect(parseArgs(stringArgv('"--name=foo bar"'))).eql({ name: 'foo bar' })
    })

    test('Single without value', () => {
        expect(parseArgs(stringArgv('--name'))).eql({ name: undefined })
    })

    test('Mutiple', () => {
        expect(parseArgs(stringArgv('--name=foo --name=bar --name=baz --name='))).eql({
            name: ['foo', 'bar', 'baz'],
        })
    })

    test('Multiple in same arg', () => {
        expect(parseArgs(stringArgv('--names 1 2 3'))).eql({ names: ['1', '2', '3'] })
    })

    test('Multiple definitions', () => {
        expect(parseArgs(stringArgv('--names 1 --age=2 "--type=false"'))).eql({ names: '1', type: 'false', age: '2' })
    })
})
