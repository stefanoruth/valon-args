import { InputRules } from '.'
import { ParsedArgs } from '../arguments'
import { NumberRule, NumberValue, RuleWithKey } from './types'

export function parseNumberRule<T extends NumberRule>(rule: RuleWithKey<T>, args: ParsedArgs): NumberValue<T> {
    if (!isNumberRule(rule)) {
        throw new Error('Invalid Rule Type')
    }

    const value = args[rule.key]?.toString()

    if (rule.required) {
        if (!value) {
            throw new Error('Value is required')
        }

        return parseFloat(value) as any
    }

    return (value ? parseFloat(value) : undefined) as any
}

export function isNumberRule(rule: InputRules): rule is NumberRule {
    return rule.type === 'number'
}
