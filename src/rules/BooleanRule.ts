import { ParsedArgs } from '../arguments'
import { BooleanRule } from '../types'

export function parseBooleanRule<T extends BooleanRule>(rule: T, key: string, args: ParsedArgs) {
    const value = args[key]?.toString()

    if (key in args && (typeof value === 'undefined' || value.length === 0)) {
        return true
    }

    if (!(key in args)) {
        return undefined
    }

    if (!value) {
        return false
    }

    const trueValues = ['true', '1']
    const falseValues = ['false', '0']

    if (trueValues.includes(value)) {
        return true
    }

    if (falseValues.includes(value)) {
        return false
    }

    return undefined
}
