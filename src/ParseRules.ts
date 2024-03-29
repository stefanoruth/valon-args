import {
    BooleanRule,
    BooleanValue,
    InputRule,
    NumberRule,
    NumberValue,
    ResultValues,
    InputRules,
    StringRule,
    StringValue,
} from './types'
import { ParsedArgs } from './arguments'
import { parseBooleanRule, parseNumberRule, parseStringRule } from './rules'

export function parseRule<T extends InputRule>(rule: T, key: string, args: ParsedArgs) {
    // console.log({ rule, key, args })

    if (rule.type === 'string') {
        return parseStringRule(rule, args[key]) as StringValue<StringRule>
    } else if (rule.type === 'number') {
        return parseNumberRule(rule, args[key]) as NumberValue<NumberRule>
    } else if (rule.type === 'boolean') {
        return parseBooleanRule(rule, key, args) as BooleanValue<BooleanRule>
    }

    throw new Error('Invalid rule type')
}

export function validateAndParseArguments<T extends InputRules>(rules: T, args: ParsedArgs): ResultValues<T> {
    // console.log({ rules, args })

    return Object.entries(rules)
        .map(([name, config]) => ({ ...config, key: name }))
        .reduce<ResultValues<T>>((obj, config) => {
            const parsedValue = parseRule(config, config.key, args)

            if (typeof obj[config.key] === 'undefined') {
                ;(obj as any)[config.key] = parsedValue
            } else {
                throw new Error('Dublicate key')
            }

            return obj
        }, {} as any)
}
