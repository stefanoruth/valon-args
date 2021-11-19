import { parseArgs } from './arguments'
import { validateAndParseArguments } from './ParseRules'
import { ResultValues, RuleSet } from './types'

export function cliArgs<T extends RuleSet>(rules: T, args?: string[]): ResultValues<T> {
    try {
        const input = parseArgs(args || process.argv.slice(2))

        console.log({ input })

        const output = validateAndParseArguments(rules, input)

        console.log({ output })

        return {} as any
    } catch (error) {
        console.log(error)

        // Exit when not stubbed
        if (1) {
            process.exit(1)
        }

        throw error
    }
}
