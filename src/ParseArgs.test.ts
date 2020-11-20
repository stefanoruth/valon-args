import { cli } from './cli'
import { parseArgs } from './ParseArgs'

describe('ParseArgs', () => {
    test('Empty', () => {
        expect(parseArgs([])).toEqual([])
    })

    test('Single with value', () => {
        expect(parseArgs(['--name=foo'])).toEqual([{ name: 'name', value: 'foo' }])
        expect(parseArgs(['--name="foo bar"'])).toEqual([{ name: 'name', value: 'foo bar' }])
    })

    test('Single without value', () => {
        expect(parseArgs(['--name'])).toEqual([{ name: 'name', value: undefined }])
    })

    test('Mutiple', () => {
        expect(parseArgs(['--name=foo', '--name=bar', '--name=baz', '--name='])).toEqual([
            { name: 'name', value: 'foo' },
            { name: 'name', value: 'bar' },
            { name: 'name', value: 'baz' },
            { name: 'name', value: undefined },
        ])
    })
})

// node cli.js --bool --name= --names=2212 --names=21321
