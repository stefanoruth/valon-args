import { InvalidNumberArgument, MissingArgument, InvalidBooleanArgument } from './Errors'

export function required(value: string | undefined, key: string) {
    if (!value) {
        throw new MissingArgument(key)
    }

    return value
}

export function parseNumber(raw: string): number {
    const value = parseFloat(raw)

    if (isNaN(value)) {
        throw new InvalidNumberArgument(raw)
    }

    return value
}

export function parseBoolean(raw: string | undefined): boolean {
    const trueValues = ['true', '1']
    const falseValues = ['false', '0']

    if (typeof raw === 'undefined' || raw === '') {
        return true
    }

    if (trueValues.includes(raw)) {
        return true
    }

    if (falseValues.includes(raw)) {
        return false
    }

    throw new InvalidBooleanArgument(raw)
}
