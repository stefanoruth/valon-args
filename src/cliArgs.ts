import { parseArgs } from './arguments'
import { validateAndParseArguments } from './ParseRules'
import { ResultValues, InputRules } from './types'
import { displayHelp, wantsHelp } from './utils'

export function cliArgs<T extends InputRules>(rules: T, commandLineArguments?: string[]): ResultValues<T> {
    try {
        const args = parseArgs(commandLineArguments || process.argv.slice(2))

        if (wantsHelp(args)) {
            console.log(displayHelp(rules))

            process.exit(0)
        }

        const output = validateAndParseArguments(rules, args)

        return output
    } catch (error) {
        console.log(error)

        process.exit(1)
    }
}
