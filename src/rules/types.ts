// Boolean
export type BooleanRule = { type: 'boolean'; required?: boolean }
export type BooleanValue<T extends BooleanRule> = T['required'] extends true ? boolean : boolean | undefined

// String
export type StringRule = { type: 'string'; required?: boolean; array?: boolean }
export type StringValue<T extends StringRule> = T['array'] extends true
    ? string[]
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
export type RuleWithKey<T> = T & { key: string }

export type InputRules = Omit<StringRule | NumberRule | BooleanRule | GroupRule | OneOfRule, 'key'>

export type RuleTypes = Pick<InputRules, 'type'>['type']

export type ReturnValues<T extends InputRules> = T extends StringRule
    ? StringValue<T>
    : T extends NumberRule
    ? NumberValue<T>
    : T extends BooleanRule
    ? BooleanValue<T>
    : T extends GroupRule
    ? GroupValue<T>
    : unknown

// Testing
// type a = ReturnValues<{ type: 'string'; required: false }>

// type MyRule = {
//     type: 'oneOf'
//     args: [{ age: { type: 'number' } }, { from: { type: 'string' }; to: { type: 'string' } }]
// }

// type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never

// type MyValue = OneOfValue<MyRule>

// type A = MyRule['args'][number]

// type Args = { [k in keyof ElementType<MyRule['args'] as const>]: unknown }

// type A2 = { [n: number]: MyRule['args'][keyof MyRule['args']] }
