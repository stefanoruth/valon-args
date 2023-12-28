import { parseArgs } from './arguments'
import { validateAndParseArguments } from './ParseRules'
import { ResultValues, InputRules } from './types'
import { displayHelp, wantsHelp } from './utils'

export function cliArgs<T extends InputRules>(
    rules: T,
    options?: { argv?: string[]; logger?: (value: string) => void }
): ResultValues<T> {
    const logger = options?.logger || console.log

    try {
        const args = parseArgs(options?.argv || process.argv.slice(2))

        if (wantsHelp(args)) {
            logger(displayHelp(rules))

            process.exit(0)
        }

        const output = validateAndParseArguments(rules, args)

        return output
    } catch (error) {
        logger(error)

        process.exit(1)
    }
}
