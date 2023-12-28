# Valon Args

Typescript node argument parser with strong types.

![npm](https://img.shields.io/npm/v/valon-args) ![npm](https://img.shields.io/npm/dt/valon-args)
![Build & Tests](https://github.com/stefanoruth/valon-args/workflows/Build%20&%20Tests/badge.svg?branch=master)

## Installation

```sh
# npm
npm install valon-args

# Yarn
yarn add valon-args

# Pnpm
pnpm add valon-args
```

## Example

```ts
import { cliArgs } from 'valon-args'

const options = cliArgs({
    name: { type: 'string', required: true },
    retries: { type: 'number' },
    force: { type: 'boolean' },
})

// All args are now typed and validated.
options.name // string
options.retires // number | undefined
options.force // boolean | undefined
```

## Documentation

```ts
import { cliArgs } from 'valon-args'

// Console args are automaticly parsed fron the terminal.
const args = cliArgs({ name: { type: 'string' } })
```

Supported types

| Input Type | Typescript type      |
| ---------- | -------------------- |
| string     | string               |
| string?    | string \| undefined  |
| string[]   | string[]             |
| number     | number               |
| number?    | number \| undefined  |
| number[]   | number[]             |
| boolean    | boolean \| undefined |

### Usage

#### String

```ts
node ./example.js --string=foo // 'foo'
node ./example.js --string="foo bar" // 'foo bar'
```

#### String[]

```ts
node ./example.js --string=foo --string=bar // ['foo', 'bar']
node ./example.js --string="foo bar" --string="bar baz" // ['foo bar', 'bar baz']
node ./example.js --string "foo bar" foobar "bar baz" // ['foo bar', 'foobar', 'bar baz']
```

#### Number

```ts
node ./example.js --number=1 // 1
```

#### Number[]

```ts
node ./example.js --number=1 --number=2 // [1, 2]
```

#### Boolean

```ts
node ./example.js --force // true
node ./example.js --force=true // true
node ./example.js --force=false // false
node ./example.js --force=1 // true
node ./example.js --force=0 // false
node ./example.js // undefined
```
