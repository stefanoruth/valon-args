import { cliArgs } from '.'

const result = cliArgs(
    {
        name: { type: 'string' },
        page: { type: 'number' },
        take: { type: 'number', required: true },
        formatPretty: { type: 'boolean' },
    },
    ['--name=steru', '--page=42', '--take=20', '--formatPretty']
)

console.table(result)
