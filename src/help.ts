import { tab, textGreen, textYellow } from './Color'
import { ParsedArgs } from './ParseArgs'
import { InputTypes } from './types'

export function userWantsHelp(args: ParsedArgs): boolean {
    const helpArg = args.find(i => i.name === 'help')

    return !!helpArg
}

export function displayHelp(args: { [k: string]: InputTypes }): string {
    const options: { command: string; type: InputTypes; help: string }[] = [
        { command: 'help', type: 'boolean', help: '' },
    ]

    for (const command of Object.keys(args)) {
        const type = args[command]

        options.push({ command, type, help: '' })
    }

    let commandLength = 0
    let typeLength = 0

    options.forEach(line => {
        if (line.command.length > commandLength) {
            commandLength = line.command.length
        }
        if (line.type.length > typeLength) {
            typeLength = line.type.length
        }
    })

    const output = [
        textYellow('Usage:'),
        `${tab}command [options]\n`,
        textYellow('Options:'),
        ...options.map(option =>
            [
                tab + textGreen('--' + option.command.padEnd(commandLength, ' ')),
                option.type.padEnd(typeLength, ' '),
                option.help,
            ].join(' ')
        ),
    ]

    return output.join('\n')
}
