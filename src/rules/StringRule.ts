import { ParsedArgValue } from '../arguments'
import { StringRule, StringValue, InputRules } from './types'

export function parseStringRule<T extends StringRule>(rule: T, value: ParsedArgValue): StringValue<T> {
    if (rule.array) {
        if (Array.isArray(value)) {
            return value as any
        }

        if (typeof value === 'string') {
            if (rule.delimiter && value.includes(rule.delimiter)) {
                value = value.split(rule.delimiter)
            }
        }

        if (rule.required) {
        } else {
        }

        return
    }

    // if (isRequired(rule) && isArray(rule)) {
    //     return ['sadsa'] as string[]
    // }
    // if (isArray(rule)) {
    //     return []
    // }
    // if (isRequired(rule)) {
    //     return 'value'
    // }
    // if (rule.array) {
    //     let data: string[]
    //     if (typeof value === 'undefined') {
    //         data = []
    //     } else if (typeof value === 'string') {
    //         data = [value]
    //     } else {
    //         data = value
    //     }
    //     if (rule.required) {
    //         if (data.length === 0) {
    //             throw new Error('Value is required')
    //         }
    //         return data as StringValue<{ required: true; array: true }>
    //     }
    //     return data
    // }
    // if (Array.isArray(value)) {
    //     throw new Error('Invalid value format')
    // }
    // if (isRequired(rule)) {
    //     if (!value) {
    //         throw new Error('Value is required')
    //     }
    //     return value
    // }

    return undefined as any
}

export function isStringRule(rule: InputRules): rule is StringRule {
    return rule.type === 'string'
}
