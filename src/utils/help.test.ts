import { wantsHelp, displayHelp } from './DisplayHelp'
import { textGreen, textYellow } from './Color'
import { describe, test, expect } from 'vitest'

describe('Help', () => {
    test('User passes in --help', () => {
        expect(wantsHelp({})).false
        expect(wantsHelp({ help: undefined })).true
    })

    test('Display of help', () => {
        expect(
            displayHelp({
                foo: { type: 'string', required: true },
                bar: { type: 'string' },
                baz: { type: 'string', array: true },
            }).split('\n')
        ).eql([
            textYellow('Usage:'),
            '  command [options]',
            '',
            textYellow('Options:'),
            `  ${textGreen('--bar ')} String`,
            `  ${textGreen('--baz ')} String`,
            `  ${textGreen('--foo ')} String`,
            `  ${textGreen('--help')} Boolean Displays help`,
        ])
    })
})
