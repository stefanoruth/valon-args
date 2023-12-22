import { cliArgs } from './cliArgs'
import stringArgv from 'string-argv'
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'

describe('Argument Types', () => {
    let log
    let exit

    beforeEach(() => {
        log = vi.spyOn(console, 'log').mockImplementation(() => undefined)
        exit = vi.spyOn(process, 'exit').mockImplementation((code?: number) => undefined as never)
    })

    afterEach(() => {
        log.mockReset()
        exit.mockReset()
    })

    describe('String', () => {
        describe('Required String', () => {
            test('Empty', () => {
                cliArgs({ name: { type: 'string', required: true } }, stringArgv(''))

                expect(log.mock.calls.at(0).at(0).message).eql('Required value')
                expect(exit.mock.calls.length).toBe(1)
            })

            test('Filled', () => {
                const args = cliArgs({ name: { type: 'string', required: true } }, stringArgv('--name=foo'))

                expect(args.name).eql('foo')
            })
        })

        describe('Optional String', () => {
            test('Empty', () => {
                const args = cliArgs({ name: { type: 'string' } }, stringArgv(''))

                expect(args.name).undefined
            })

            test('Filled', () => {
                const args = cliArgs({ name: { type: 'string' } }, stringArgv('--name=foo'))

                expect(args.name).eql('foo')
            })
        })

        describe('Multilpe Strings', () => {
            test('Empty', () => {
                const args = cliArgs({ names: { type: 'string', array: true } }, stringArgv(''))

                expect(args.names).eql([])
            })

            test('One item', () => {
                const args = cliArgs({ names: { type: 'string', array: true } }, stringArgv('--names=foo'))

                expect(args.names).eql(['foo'])
            })

            test('Two items', () => {
                const args = cliArgs({ names: { type: 'string', array: true } }, stringArgv('--names=foo --names=bar'))

                expect(args.names).eql(['foo', 'bar'])
            })

            test('Multiple items', () => {
                const args = cliArgs(
                    { names: { type: 'string', array: true } },
                    stringArgv('--names=foo --names=bar --names=baz')
                )

                expect(args.names).eql(['foo', 'bar', 'baz'])
            })

            test('Multiple values in the same arg', () => {
                const args = cliArgs({ names: { type: 'string', array: true } }, stringArgv('--names foo bar baz'))

                expect(args.names).eql(['foo', 'bar', 'baz'])
            })
        })
    })

    describe('Number', () => {
        describe('Required Number', () => {
            test('Empty', () => {
                cliArgs({ age: { type: 'number', required: true } }, stringArgv(''))

                expect(exit.mock.calls.length).toBe(1)
            })

            test('Invalid number argument', () => {
                cliArgs({ age: { type: 'number', required: true } }, stringArgv('--age=foo'))

                expect(exit.mock.calls.length).toBe(1)
            })

            test('Filled', () => {
                const args = cliArgs({ age: { type: 'number', required: true } }, stringArgv('--age=24'))

                expect(args.age).eql(24)
            })
        })

        describe('Optional Number', () => {
            test('Empty', () => {
                const args = cliArgs({ age: { type: 'number' } }, stringArgv(''))

                expect(args.age).undefined
            })

            test('Filled', () => {
                const args = cliArgs({ age: { type: 'number' } }, stringArgv('--age=24'))

                expect(args.age).eql(24)
            })
        })

        describe('Multilpe  Numbers', () => {
            test('Empty', () => {
                const args = cliArgs({ numbers: { type: 'number', array: true } }, stringArgv(''))

                expect(args.numbers).eql([])
            })

            test('One item', () => {
                const args = cliArgs({ numbers: { type: 'number', array: true } }, stringArgv('--numbers=1'))

                expect(args.numbers).eql([1])
            })

            test('Two items', () => {
                const args = cliArgs(
                    { numbers: { type: 'number', array: true } },
                    stringArgv('--numbers=1 --numbers=2')
                )

                expect(args.numbers).eql([1, 2])
            })

            test('Multiple items', () => {
                const args = cliArgs(
                    { numbers: { type: 'number', array: true } },
                    stringArgv('--numbers=1 --numbers=2 --numbers=3')
                )

                expect(args.numbers).eql([1, 2, 3])
            })
        })
    })

    describe('Boolean', () => {
        test('Empty', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv(''))

            expect(args.foo).undefined
        })

        test('Preset but not filled', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo'))

            expect(args.foo).true
        })

        test('Preset with no value', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo='))

            expect(args.foo).true
        })

        test('Preset with "true" value', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo=true'))

            expect(args.foo).true
        })

        test('Preset with "1" value', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo=1'))

            expect(args.foo).true
        })

        test('Preset with "false" value', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo=false'))

            expect(args.foo).false
        })

        test('Preset with "0" value', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo=0'))

            expect(args.foo).false
        })
    })
})
