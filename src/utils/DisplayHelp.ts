import { ParsedArgs } from '../arguments'
import { parseBooleanRule } from '../rules'
import { InputRule, InputRules } from '../types'
import { tab, textGreen, textYellow } from './Color'
import { capitalizeFirstLetter } from './utils'

export function wantsHelp(args: ParsedArgs): boolean {
    return !!parseBooleanRule({ type: 'boolean' }, 'help', args)
}

export function displayHelp(args: InputRules): string {
    let options: { command: string; rule: InputRule }[] = [
        { command: 'help', rule: { type: 'boolean', help: 'Displays help' } },
    ]

    options.push(...Object.keys(args).map(command => ({ command, rule: args[command] })))

    options = options.sort((a, b) => a.command.localeCompare(b.command))

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
                capitalizeFirstLetter(option.rule.type),
                option.rule.help?.padStart(typeLength, ' '),
            ]
                .filter(Boolean)
                .join(' ')
        ),
    ]

    return output.join('\n')
}
