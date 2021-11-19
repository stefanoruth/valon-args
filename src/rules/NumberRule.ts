import { NumberRule, NumberValue, RuleWithKey } from './types'

export function parseNumberRule<T extends NumberRule>(rule: RuleWithKey<T>): NumberValue<T> {
    return null as any
}
