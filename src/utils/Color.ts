export function textYellow(text: string) {
    return `\x1b[33m${text}\x1b[0m`
}

export function textGreen(text: string) {
    return `\x1b[32m${text}\x1b[0m`
}

export const tab = ' '.repeat(2)
