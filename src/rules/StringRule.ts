import { InputRules } from '.'
import { ParsedArgs } from '../arguments'
import { RuleWithKey, StringRule, StringValue } from './types'

export function parseStringRule<T extends StringRule>(rule: RuleWithKey<T>, args: ParsedArgs): StringValue<T> {
    if (!isStringRule(rule)) {
        throw new Error('Invalid Rule Type')
    }

    const value = args[rule.key]

    if (rule.array) {
        let data: string[]

        if (typeof value === 'undefined') {
            data = []
        } else if (typeof value === 'string') {
            data = [value]
        } else {
            data = value
        }

        if (rule.required) {
            if (data.length === 0) {
                throw new Error('Value is required')
            }

            return data as any
        }

        return data as any
    }

    if (Array.isArray(value)) {
        throw new Error('Invalid value format')
    }

    if (rule.required) {
        if (!value) {
            throw new Error('Value is required')
        }

        return value as any
    }

    return value as any
}

export function isStringRule(rule: InputRules): rule is StringRule {
    return rule.type === 'string'
}
