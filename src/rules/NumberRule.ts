import { ParsedArgValue } from '../arguments'
import { NumberRule, NumberValue, InputRules } from './types'

export function parseNumberRule<T extends NumberRule>(rule: T, value: ParsedArgValue): NumberValue<T> {
    if (!isNumberRule(rule)) {
        throw new Error('Invalid Rule Type')
    }

    value = value?.toString()

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
