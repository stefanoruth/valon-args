export interface ParsedArgs {
    [k: string]: string | string[] | undefined
}

export function parseArgs(args: string[]): ParsedArgs {
    let name: string

    return args.reduce<{ [k: string]: string | undefined | string[] }>((obj, arg) => {
        const splitPos = arg.indexOf('=')
        const isArg = arg.startsWith('--')
        let value: string | undefined

        if (isArg) {
            if (splitPos !== -1) {
                name = arg.slice(2, splitPos)
            } else {
                name = arg.slice(2)
            }
        }

        if (splitPos !== -1) {
            value = arg.slice(splitPos + 1)
        } else if (!isArg) {
            value = arg
        }

        if (typeof obj[name] === 'undefined') {
            obj[name] = value
        } else if (value) {
            if (typeof obj[name] === 'string') {
                obj[name] = [obj[name] as string, value]
            } else if (Array.isArray(obj[name])) {
                ;(obj[name] as string[]).push(value)
            }
        }

        return obj
    }, {})
}
