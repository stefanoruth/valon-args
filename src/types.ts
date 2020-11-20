export type InputTypes = 'string' | 'string?' | 'string[]' | 'number' | 'number?' | 'number[]' | 'boolean'

export type ReturnTypes<T extends InputTypes> = T extends 'string'
    ? string
    : T extends 'string?'
    ? string | undefined
    : T extends 'string[]'
    ? string[]
    : T extends 'boolean'
    ? boolean | undefined
    : T extends 'number'
    ? number
    : T extends 'number?'
    ? number | undefined
    : T extends 'number[]'
    ? number[]
    : unknown
