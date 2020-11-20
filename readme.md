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
```

## Example

```ts
import { cliArgs } from 'valon-args'

const options = cliArgs({
    name: 'string',
    retries: 'number?',
    force: 'boolean',
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
const args = cliArgs({ name: 'string?' })
```

Supported types

| Input Value | Typescript type      |
| ----------- | -------------------- |
| string      | string               |
| string?     | string \| undefined  |
| string[]    | string[]             |
| number      | number               |
| number?     | number \| undefined  |
| number[]    | number[]             |
| boolean     | boolean \| undefined |
