import { userWantsHelp, displayHelp } from './DisplayHelp'

describe('Help', () => {
    test('User passes in --help', () => {
        expect(userWantsHelp({})).toBeFalsy()
        expect(userWantsHelp({ help: undefined })).toBeTruthy()
    })

    test('Display of help', () => {
        expect(
            displayHelp({
                foo: { type: 'string', required: true },
                bar: { type: 'string' },
                baz: { type: 'string', array: true },
            })
        ).toMatchInlineSnapshot(`
            "[33mUsage:[0m
              command [options]

            [33mOptions:[0m
              [32m--help[0m boolean 
              [32m--foo [0m string  
              [32m--bar [0m string  
              [32m--baz [0m string  "
        `)
    })
})
