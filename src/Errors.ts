export class MissingArgument extends Error {
    constructor(arg: string) {
        super(`Missing Argument: ${arg}`)
    }
}

export class InvalidNumberArgument extends Error {
    constructor(arg: string) {
        super(`Invalid Number Argument: ${arg}`)
    }
}

export class InvalidBooleanArgument extends Error {
    constructor(arg: string) {
        super(`Invalid Boolean Argument: ${arg}`)
    }
}
