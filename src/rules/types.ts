// Boolean
export type BooleanRule = { type: 'boolean'; required?: boolean }
export type BooleanValue<T extends BooleanRule> = T['required'] extends true ? boolean : boolean | undefined

// String
export type StringRule = { type: 'string'; required?: boolean; array?: boolean }
export type StringValue<T extends StringRule> = T extends { required: true; array: true }
    ? string[]
    : T['array'] extends true
    ? string[] | undefined
    : T['required'] extends true
    ? string
    : string | undefined

// Number
export type NumberRule = { type: 'number'; required?: boolean }
export type NumberValue<T extends NumberRule> = T['required'] extends true ? number : number | undefined

// Group
export type GroupRule = { type: 'group'; args: { [k: string]: InputRules } }
export type GroupValue<T extends GroupRule> = { [k in keyof T['args']]: ReturnValues<T['args'][k]> } | undefined

// OneOf
export type OneOfRule = { type: 'oneOf'; args: { [k: string]: InputRules }[] }
export type OneOfValue<T extends OneOfRule> = unknown

// Generics

export type InputRules = StringRule | NumberRule | BooleanRule | GroupRule | OneOfRule

export type RuleTypes = InputRules['type']

export type ReturnValues<T extends InputRules> = T extends StringRule
    ? StringValue<T>
    : T extends NumberRule
    ? NumberValue<T>
    : T extends BooleanRule
    ? BooleanValue<T>
    : T extends GroupRule
    ? GroupValue<T>
    : unknown
