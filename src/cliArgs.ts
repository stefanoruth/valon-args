import { parseArgs } from './arguments'
import { validateAndParseArguments } from './ParseRules'
import { ResultValues, InputRules } from './types'
import { displayHelp, wantsHelp } from './utils'

export function cliArgs<T extends InputRules>(rules: T, commandLineArguments?: string[]): ResultValues<T> {
    try {
        const args = parseArgs(commandLineArguments || process.argv.slice(2))

        // console.log({ args })

        if (wantsHelp(args)) {
            console.log(displayHelp(rules))

            // Exit when not stubbed
            process.exit(0)
        }

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
