import { cliArgs } from '../src'

const args = cliArgs({ force: 'boolean', name: 'string' })

console.log(args)
