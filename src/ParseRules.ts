import { ResultValues, RuleSet } from './types'
import { ParsedArgs } from './arguments'
import {
    isBooleanRule,
    isNumberRule,
    isStringRule,
    parseBooleanRule,
    parseGroupRule,
    parseNumberRule,
    parseOneOfRule,
    parseStringRule,
    StringValue,
    InputRules,
    ReturnValues,
} from './rules'

export function parseRule<T extends InputRules>(rule: T, key: string, args: ParsedArgs) {
    if (isStringRule(rule)) {
        return parseStringRule(rule, args[key])
    }

    if (isNumberRule(rule)) {
        return parseNumberRule(rule, args[key])
    }

    if (isBooleanRule(rule)) {
        return parseBooleanRule(rule, key, args)
    }

    // if (rule.type === 'group') {
    //     return parseGroupRule(rule, arg)
    // }

    // if (rule.type === 'oneOf') {
    //     return parseOneOfRule(rule, arg)
    // }

    throw new Error('Invalid rule type')
}

export function validateAndParseArguments<T extends RuleSet>(rules: T, args: ParsedArgs): ResultValues<T> {
    const res = Object.entries(rules)
        .map(([name, config]) => ({ ...config, key: name }))
        .reduce<ResultValues<T>>((obj, config) => {
            const parsedValue = parseRule(config, config.key, args)

            console.log({ parsedValue, config })

            if (typeof obj[config.key] === 'undefined') {
                ;(obj as any)[config.key] = parsedValue
            } else {
                throw new Error('No dublicate keys here')
            }

            return obj
        }, {} as any)

    return res as any
}
