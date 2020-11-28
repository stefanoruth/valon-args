export type ParsedArgs = { name: string; value: string | undefined }[]

export function parseArgs(args: string[]): ParsedArgs {
    return args.map(arg => {
        const splitPos = arg.indexOf('=')
        let name: string

        if (splitPos === -1) {
            name = arg.substr(2)
        } else {
            name = arg.substr(2, splitPos - 2)
        }

        let value: string | undefined

        if (splitPos !== -1) {
            value = arg.substr(splitPos + 1)

            if (value.length === 0) {
                value = undefined
            } else if (value.startsWith('"') && value.endsWith('"')) {
                value = value.substr(1, value.length - 2)
            }
        }

        return { name, value }
    })
}
