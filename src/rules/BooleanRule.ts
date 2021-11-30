import { ParsedArgs } from '../arguments'
import { BooleanRule, BooleanValue, InputRules } from './types'

export function parseBooleanRule<T extends BooleanRule>(rule: T, key: string, args: ParsedArgs): BooleanValue<T> {
    if (!isBooleanRule(rule)) {
        throw new Error('Invalid Rule Type')
    }

    const value = args[key]?.toString()

    if (key in args && typeof value === 'undefined') {
        return true
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

    return undefined as any
}

export function isBooleanRule(rule: InputRules): rule is BooleanRule {
    return rule.type === 'boolean'
}
