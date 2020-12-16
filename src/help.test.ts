import { userWantsHelp, displayHelp } from './help'

describe('Help', () => {
    test('User passes in --help', () => {
        expect(userWantsHelp([])).toBeFalsy()
        expect(userWantsHelp([{ name: 'help', value: '' }])).toBeTruthy()
    })

    test('Display of help', () => {
        expect(displayHelp({ foo: 'string', bar: 'string?', baz: 'string[]' })).toMatchInlineSnapshot(`
            "[33mUsage:[0m
              command [options]

            [33mOptions:[0m
              [32m--help[0m boolean  
              [32m--foo [0m string   
              [32m--bar [0m string?  
              [32m--baz [0m string[] "
        `)
    })
})
