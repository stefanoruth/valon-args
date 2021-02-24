import { parseArgs } from './ParseArgs'
import { InputTypes, ReturnTypes } from './types'
import { parseBoolean, parseNumber, required } from './Validation'
import { displayHelp, userWantsHelp } from './help'
import { displayError } from './Errors'

export function cliArgs<T extends { [k: string]: InputTypes }>(
    returnArgs: T,
    args?: string[]
): { [k in keyof T]: ReturnTypes<T[k]> } {
    try {
        const input = parseArgs(args || process.argv.slice(2))

        const output: { [k in keyof T]?: any } = {}

        const getValue = (name: string) => {
            const value = input[name]

            if (Array.isArray(value)) {
                return value.toString()
            }

            return value
        }
        const getValues = (name: string): string[] => {
            const values = input[name]

            if (typeof values === 'undefined') {
                return []
            }

            if (typeof values === 'string') {
                return [values]
            }

            return values
        }

        for (const key of Object.keys(returnArgs)) {
            const type = returnArgs[key]
            let value

            if (type === 'string[]') {
                value = getValues(key).filter(Boolean)
            } else if (type === 'string') {
                value = required(getValue(key), key)
            } else if (type === 'string?') {
                value = getValue(key)
            } else if (type === 'number') {
                value = parseNumber(required(getValue(key), key))
            } else if (type === 'number?') {
                value = getValue(key)

                if (value) {
                    value = parseNumber(value.toString())
                }
            } else if (type === 'number[]') {
                value = getValues(key)
                    .filter(Boolean)
                    .map(val => parseNumber(required(val, key)))
            } else if (type == 'boolean') {
                if (key in input) {
                    value = parseBoolean(getValue(key))
                }
            }

            ;(output as any)[key] = value
        }

        if (userWantsHelp(input)) {
            console.log(displayHelp(returnArgs))

            // Exit when not stubbed
            process.exit(0)
        }

        return output as any
    } catch (error) {
        console.log(displayError(error))

        // Exit when not stubbed
        if (1) {
            process.exit(1)
        }

        throw error
    }
}
