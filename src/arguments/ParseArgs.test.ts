import { parseArgs } from './ParseArgs'
import stringArgv from 'string-argv'

describe('ParseArgs', () => {
    test('Empty', () => {
        expect(parseArgs(stringArgv(''))).toEqual({})
    })

    test('Single with value', () => {
        expect(parseArgs(stringArgv('--name=foo'))).toEqual({ name: 'foo' })
        expect(parseArgs(stringArgv('"--name=foo bar"'))).toEqual({ name: 'foo bar' })
    })

    test('Single without value', () => {
        expect(parseArgs(stringArgv('--name'))).toEqual({ name: undefined })
    })

    test('Mutiple', () => {
        expect(parseArgs(stringArgv('--name=foo --name=bar --name=baz --name='))).toEqual({
            name: ['foo', 'bar', 'baz'],
        })
    })

    test('Multiple in same arg', () => {
        expect(parseArgs(stringArgv('--names 1 2 3'))).toEqual({ names: ['1', '2', '3'] })
    })
})
