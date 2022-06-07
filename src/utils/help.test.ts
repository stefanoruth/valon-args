import { expect } from 'chai'
import { wantsHelp, displayHelp } from './DisplayHelp'

describe('Help', () => {
    it('User passes in --help', () => {
        expect(wantsHelp({})).false
        expect(wantsHelp({ help: undefined })).true
    })

    it('Display of help', () => {
        // expect(
        //     displayHelp({
        //         foo: { type: 'string', required: true },
        //         bar: { type: 'string' },
        //         baz: { type: 'string', array: true },
        //     })
        // ).toMatchInlineSnapshot(`
        //     "[33mUsage:[0m
        //       command [options]
        //     [33mOptions:[0m
        //       [32m--bar [0m String
        //       [32m--baz [0m String
        //       [32m--foo [0m String
        //       [32m--help[0m Boolean Displays help"
        // `)
    })
})
