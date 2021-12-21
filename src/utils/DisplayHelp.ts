import { ParsedArgs } from '../arguments'
import { InputRule, InputRules } from '../types'
import { tab, textGreen, textYellow } from './Color'

export function userWantsHelp(args: ParsedArgs): boolean {
    return 'help' in args
}

export function displayHelp(args: InputRules): string {
    const options: { command: string; rule: InputRule }[] = [{ command: 'help', rule: { type: 'boolean' } }]

    for (const command of Object.keys(args)) {
        const rule = args[command]

        options.push({ command, rule })
    }

    let commandLength = 0
    let typeLength = 0

    options.forEach(line => {
        if (line.command.length > commandLength) {
            commandLength = line.command.length
        }
        if (line.rule.type.length > typeLength) {
            typeLength = line.rule.type.length
        }
    })

    const output = [
        textYellow('Usage:'),
        `${tab}command [options]\n`,
        textYellow('Options:'),
        ...options.map(option =>
            [
                tab + textGreen('--' + option.command.padEnd(commandLength, ' ')),
                option.rule.type.padEnd(typeLength, ' '),
                option.rule.help,
            ].join(' ')
        ),
    ]

    return output.join('\n')
}
