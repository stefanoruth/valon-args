import { ParsedArgValue } from '../arguments'
import { NumberRule } from '../types'
import { parseArray } from './ParseArray'

export function parseNumberRule<T extends NumberRule>(rule: T, value: ParsedArgValue) {
    if (rule.array) {
        return parseArray(rule, value).map(v => parseFloat(v))
    }

    value = value?.toString()

    if (rule.required) {
        if (!value) {
            throw new Error('Value is required')
        }

        return parseFloat(value)
    }

    return value ? parseFloat(value) : undefined
}
