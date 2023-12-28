import { ParsedArgValue } from '../arguments'
import { StringRule } from '../types'
import { parseArray } from './ParseArray'

export function parseStringRule<T extends StringRule>(rule: T, value: ParsedArgValue) {
    if (rule.array) {
        return parseArray(rule, value)
    }

    value = value?.toString().trim()

    if (value?.length === 0) {
        value = undefined
    }

    if (rule.required && typeof value === 'undefined') {
        throw new Error(`Required value`)
    }

    return value
}
