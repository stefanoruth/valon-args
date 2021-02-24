import { cliArgs as cli } from './index'
import stringArgv from 'string-argv'

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never)
const mockLog = jest.spyOn(console, 'log').mockImplementation(value => value)

afterEach(() => {
    jest.clearAllMocks()
})

describe('Argument Types', () => {
    describe('String', () => {
        describe('Required String', () => {
            test('Empty', () => {
                expect(() => cli({ name: 'string' }, stringArgv(''))).toThrow()
                expect(mockExit).toHaveBeenCalledWith(1)
                expect(mockLog.mock.calls[0][0]).toMatchInlineSnapshot(`
                    "[33mError:[0m
                      Missing Argument: \\"name\\""
                `)
            })

            test('Filled', () => {
                const args = cli({ name: 'string' }, stringArgv('--name=foo'))

                expect(args.name).toBe('foo')
            })
        })

        describe('Optional String', () => {
            test('Empty', () => {
                const args = cli({ name: 'string?' }, stringArgv(''))

                expect(args.name).toBeUndefined()
            })

            test('Filled', () => {
                const args = cli({ name: 'string?' }, stringArgv('--name=foo'))

                expect(args.name).toBe('foo')
            })
        })

        describe('Multilpe Strings', () => {
            test('Empty', () => {
                const args = cli({ names: 'string[]' }, stringArgv(''))

                expect(args.names).toEqual([])
            })

            test('One item', () => {
                const args = cli({ names: 'string[]' }, stringArgv('--names=foo'))

                expect(args.names).toEqual(['foo'])
            })

            test('Two items', () => {
                const args = cli({ names: 'string[]' }, stringArgv('--names=foo --names=bar'))

                expect(args.names).toEqual(['foo', 'bar'])
            })

            test('Multiple items', () => {
                const args = cli({ names: 'string[]' }, stringArgv('--names=foo --names=bar --names=baz'))

                expect(args.names).toEqual(['foo', 'bar', 'baz'])
            })

            test('Multiple values in the same arg', () => {
                const args = cli({ names: 'string[]' }, stringArgv('--names foo bar baz'))

                expect(args.names).toEqual(['foo', 'bar', 'baz'])
            })
        })
    })

    describe('Number', () => {
        describe('Required Number', () => {
            test('Empty', () => {
                expect(() => cli({ age: 'number' }, stringArgv(''))).toThrow()
                expect(mockExit).toHaveBeenCalledWith(1)
                expect(mockLog.mock.calls[0][0]).toMatchInlineSnapshot(`
                    "[33mError:[0m
                      Missing Argument: \\"age\\""
                `)
            })

            test('Invalid number argument', () => {
                expect(() => cli({ age: 'number' }, stringArgv('--age=foo'))).toThrow()
                expect(mockExit).toHaveBeenCalledWith(1)
                expect(mockLog.mock.calls[0][0]).toMatchInlineSnapshot(`
                    "[33mError:[0m
                      Invalid Number Argument: \\"foo\\""
                `)
            })

            test('Filled', () => {
                const args = cli({ age: 'number' }, stringArgv('--age=24'))

                expect(args.age).toBe(24)
            })
        })

        describe('Optional Number', () => {
            test('Empty', () => {
                const args = cli({ age: 'number?' }, stringArgv(''))

                expect(args.age).toBeUndefined()
            })

            test('Filled', () => {
                const args = cli({ age: 'number?' }, stringArgv('--age=24'))

                expect(args.age).toBe(24)
            })
        })

        describe('Multilpe  Numbers', () => {
            test('Empty', () => {
                const args = cli({ numbers: 'number[]' }, stringArgv(''))

                expect(args.numbers).toEqual([])
            })

            test('One item', () => {
                const args = cli({ numbers: 'number[]' }, stringArgv('--numbers=1'))

                expect(args.numbers).toEqual([1])
            })

            test('Two items', () => {
                const args = cli({ numbers: 'number[]' }, stringArgv('--numbers=1 --numbers=2'))

                expect(args.numbers).toEqual([1, 2])
            })

            test('Multiple items', () => {
                const args = cli({ numbers: 'number[]' }, stringArgv('--numbers=1 --numbers=2 --numbers=3'))

                expect(args.numbers).toEqual([1, 2, 3])
            })
        })
    })

    describe('Boolean', () => {
        test('Empty', () => {
            const args = cli({ foo: 'boolean' }, stringArgv(''))

            expect(args.foo).toBeUndefined()
        })

        test('Preset but not filled', () => {
            const args = cli({ foo: 'boolean' }, stringArgv('--foo'))

            expect(args.foo).toBeTruthy()
        })

        test('Preset with no value', () => {
            const args = cli({ foo: 'boolean' }, stringArgv('--foo='))

            expect(args.foo).toBeTruthy()
        })

        test('Preset with "true" value', () => {
            const args = cli({ foo: 'boolean' }, stringArgv('--foo=true'))

            expect(args.foo).toBeTruthy()
        })

        test('Preset with "1" value', () => {
            const args = cli({ foo: 'boolean' }, stringArgv('--foo=1'))

            expect(args.foo).toBeTruthy()
        })

        test('Preset with "false" value', () => {
            const args = cli({ foo: 'boolean' }, stringArgv('--foo=false'))

            expect(args.foo).toBeFalsy()
        })

        test('Preset with "0" value', () => {
            const args = cli({ foo: 'boolean' }, stringArgv('--foo=0'))

            expect(args.foo).toBeFalsy()
        })
    })
})
