import { parseArgs } from './ParseArgs'
import stringArgv from 'string-argv'
import { expect } from 'chai'

describe('ParseArgs', () => {
    it('Empty', () => {
        expect(parseArgs(stringArgv(''))).eql({})
    })

    it('Single with value', () => {
        expect(parseArgs(stringArgv('--name=foo'))).eql({ name: 'foo' })
        expect(parseArgs(stringArgv('"--name=foo bar"'))).eql({ name: 'foo bar' })
    })

    it('Single without value', () => {
        expect(parseArgs(stringArgv('--name'))).eql({ name: undefined })
    })

    it('Mutiple', () => {
        expect(parseArgs(stringArgv('--name=foo --name=bar --name=baz --name='))).eql({
            name: ['foo', 'bar', 'baz'],
        })
    })

    it('Multiple in same arg', () => {
        expect(parseArgs(stringArgv('--names 1 2 3'))).eql({ names: ['1', '2', '3'] })
    })
})
