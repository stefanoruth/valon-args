import { userWantsHelp, displayHelp } from './help'

describe('Help', () => {
    test('User passes in --help', () => {
        expect(userWantsHelp([])).toBeFalsy()
        expect(userWantsHelp([{ name: 'help', value: '' }])).toBeTruthy()
    })

    test('Display of help', () => {
        expect(displayHelp({ foo: 'string', bar: 'string?', baz: 'string[]' }))
    })
})
