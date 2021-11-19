import { InputArgs, ReturnArgs } from '.'
import { parseBooleanRule, parseGroupRule, parseNumberRule, parseOneOfRule, parseStringRule } from './rules'
import { InputRules, RuleWithKey, ReturnValues } from './rules/types'

export function parseRule<T extends InputRules>(rule: RuleWithKey<T>, arg: any): ReturnValues<T> {
    // if (rule.type === 'string') {
    //     return parseStringRule(rule, arg)
    // }

    // if (rule.type === 'number') {
    //     return parseNumberRule(rule, arg)
    // }

    // if (rule.type === 'boolean') {
    //     return parseBooleanRule(rule, arg)
    // }

    // if (rule.type === 'group') {
    //     return parseGroupRule(rule, arg)
    // }

    // if (rule.type === 'oneOf') {
    //     return parseOneOfRule(rule, arg)
    // }

    throw new Error('Invalid rule type')
}

export function validateAndParseArguments<T extends InputArgs>(rules: T, args: any): ReturnArgs<T> {
    // Object.entries(rules).map(([name, config]) => {
    // return parseRule({ ...config, key: name })
    // })

    return {} as any
}
