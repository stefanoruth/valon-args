import { ResultValues, RuleSet } from '.'
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
} from './rules'
import { InputRules, RuleWithKey, ReturnValues } from './rules/types'

export function parseRule<T extends InputRules>(rule: RuleWithKey<T>, args: ParsedArgs): ReturnValues<T> {
    if (isStringRule(rule)) {
        return parseStringRule(rule, args) as any
    }

    if (isNumberRule(rule)) {
        return parseNumberRule(rule, args) as any
    }

    if (isBooleanRule(rule)) {
        return parseBooleanRule(rule, args) as any
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
            const parsedValue = parseRule(config, args)

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
