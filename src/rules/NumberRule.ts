import { ParsedArgValue } from '../arguments'
import { NumberRule } from '../types'
import { parseArray } from './ParseArray'

export function parseNumberRule<T extends NumberRule>(rule: T, rawValue: ParsedArgValue) {
    if (rule.array) {
        return parseArray(rule, rawValue).map(v => parseFloat(v))
    }

    let value = rawValue ? parseFloat(rawValue.toString()) : undefined

    if (rule.required) {
        if (!value || isNaN(value) || (Array.isArray(value) && value.length === 0)) {
            throw new Error('Value is required')
        }
    }

    return value
}
