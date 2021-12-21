import { ParsedArgValue } from '../arguments'
import { NumberRule, StringRule } from '../types'

export function parseArray(rule: StringRule | NumberRule, value: ParsedArgValue) {
    if (rule.required && !value) {
        throw new Error(`Required value`)
    }

    if (Array.isArray(value)) {
        if (rule.required && value.length === 0) {
            throw new Error(`Required value`)
        }

        return value
    }

    if (typeof value === 'string') {
        value = value.trim()

        if (rule.delimiter && value.includes(rule.delimiter)) {
            value = value.split(rule.delimiter).map(v => v.trim())
        }

        if (rule.required && value.length === 0) {
            throw new Error(`Required value`)
        }

        if (Array.isArray(value)) {
            return value
        }

        if (value.length === 0) {
            return []
        }

        return [value]
    }

    if (rule.required) {
        throw new Error(`Required value`)
    }

    return []
}
