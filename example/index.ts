import { cliArgs } from '../src'

const args = cliArgs({ force: 'boolean', title: 'string?', names: 'string[]', age: 'number?' })

console.log(args)
