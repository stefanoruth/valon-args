import { cliArgs } from '.'

const argv = process.argv.slice(2)

const result = cliArgs(
    {
        name: { type: 'string', help: 'Input my name' },
        page: { type: 'number', help: 'Default: 1' },
        take: { type: 'number', required: true, help: 'Default: 20' },
        formatPretty: { type: 'boolean' },
    },
    {
        argv: argv.length ? argv : ['--name=steru', '--page=42', '--take=20', '--formatPretty=0', '--help'],
    }
)

console.table(result)
