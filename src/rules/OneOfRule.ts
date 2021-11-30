import { OneOfRule, OneOfValue } from './types'

export function parseOneOfRule<T extends OneOfRule>(rule: T): OneOfValue<T> {
    return null as any
}
