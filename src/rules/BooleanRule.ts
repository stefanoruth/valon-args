import { InputRules } from '.'
import { ParsedArgs } from '../arguments'
import { BooleanRule, BooleanValue, RuleWithKey } from './types'

export function parseBooleanRule<T extends BooleanRule>(rule: RuleWithKey<T>, args: ParsedArgs): BooleanValue<T> {
    if (!isBooleanRule(rule)) {
        throw new Error('Invalid Rule Type')
    }

    const value = args[rule.key]?.toString()

    if (rule.key in args && typeof value === 'undefined') {
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

function parseBooleanValue(raw: string | undefined): boolean {
    const trueValues = ['true', '1']
    const falseValues = ['false', '0']

    if (typeof raw === 'undefined' || raw === '') {
        return true
    }

    if (trueValues.includes(raw)) {
        return true
    }

    if (falseValues.includes(raw)) {
        return false
    }

    return false
}
