import { OneOfRule, OneOfValue, RuleWithKey } from './types'

export function parseOneOfRule<T extends OneOfRule>(rule: RuleWithKey<T>): OneOfValue<T> {
    return null as any
}
