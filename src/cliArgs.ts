import { parseArgs } from './arguments'
import { validateAndParseArguments } from './ParseRules'
import { ResultValues, RuleSet } from './types'

export function cliArgs<T extends RuleSet>(rules: T, commandLineArguments?: string[]): ResultValues<T> {
    try {
        const args = parseArgs(commandLineArguments || process.argv.slice(2))

        console.log({ args })

        const output = validateAndParseArguments(rules, args)

        return output
    } catch (error) {
        console.log(error)

        // Exit when not stubbed
        if (1) {
            process.exit(1)
        }

        throw error
    }
}
