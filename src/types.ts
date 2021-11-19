import { InputRules, ReturnValues } from './rules'

export type RuleSet = { [k: string]: InputRules }
export type ResultValues<T extends RuleSet> = { [k in keyof T]: ReturnValues<T[k]> }
