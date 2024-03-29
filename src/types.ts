// Boolean
export type BooleanRule = { type: 'boolean'; required?: boolean; help?: string }
export type BooleanValue<T extends BooleanRule> = T['required'] extends true ? boolean : boolean | undefined

// String
export type StringRule = { type: 'string'; required?: boolean; array?: boolean; delimiter?: string; help?: string }
export type StringValue<T extends StringRule> = T extends { required: true; array: true }
    ? string[]
    : T['array'] extends true
    ? string[] | undefined
    : T['required'] extends true
    ? string
    : string | undefined

// Number
export type NumberRule = { type: 'number'; required?: boolean; array?: boolean; delimiter?: string; help?: string }
export type NumberValue<T extends NumberRule> = T['required'] extends true ? number : number | undefined

// Generics
export type InputRule = StringRule | NumberRule | BooleanRule

export type ReturnValue<T extends InputRule> = T extends StringRule
    ? StringValue<T>
    : T extends NumberRule
    ? NumberValue<T>
    : T extends BooleanRule
    ? BooleanValue<T>
    : unknown

// Function Input & Output
export type InputRules = { [k: string]: InputRule }
export type ResultValues<T extends InputRules> = { [k in keyof T]: ReturnValue<T[k]> }
