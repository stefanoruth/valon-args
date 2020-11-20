import { cliArgs as cli } from './index'

describe('Argument Types', () => {
    describe('String', () => {
        describe('Required String', () => {
            test('Empty', () => {
                expect(() => cli({ name: 'string' }, [])).toThrow()
            })

            test('Filled', () => {
                const args = cli({ name: 'string' }, ['--name=foo'])

                expect(args.name).toBe('foo')
            })
        })

        describe('Optional String', () => {
            test('Empty', () => {
                const args = cli({ name: 'string?' }, [])

                expect(args.name).toBeUndefined()
            })

            test('Filled', () => {
                const args = cli({ name: 'string?' }, ['--name=foo'])

                expect(args.name).toBe('foo')
            })
        })

        describe('Multilpe Strings', () => {
            test('Empty', () => {
                const args = cli({ names: 'string[]' }, [])

                expect(args.names).toEqual([])
            })

            test('One item', () => {
                const args = cli({ names: 'string[]' }, ['--names=foo'])

                expect(args.names).toEqual(['foo'])
            })

            test('Two items', () => {
                const args = cli({ names: 'string[]' }, ['--names=foo', '--names=bar'])

                expect(args.names).toEqual(['foo', 'bar'])
            })

            test('Multiple items', () => {
                const args = cli({ names: 'string[]' }, ['--names=foo', '--names=bar', '--names=baz'])

                expect(args.names).toEqual(['foo', 'bar', 'baz'])
            })
        })
    })

    describe('Number', () => {
        describe('Required Number', () => {
            test('Empty', () => {
                expect(() => cli({ age: 'number' }, [])).toThrow()
            })

            test('Invalid number argument', () => {
                expect(() => cli({ age: 'number' }, ['--age=foo'])).toThrow()
            })

            test('Filled', () => {
                const args = cli({ age: 'number' }, ['--age=24'])

                expect(args.age).toBe(24)
            })
        })

        describe('Optional Number', () => {
            test('Empty', () => {
                const args = cli({ age: 'number?' }, [])

                expect(args.age).toBeUndefined()
            })

            test('Filled', () => {
                const args = cli({ age: 'number?' }, ['--age=24'])

                expect(args.age).toBe(24)
            })
        })

        describe('Multilpe  Numbers', () => {
            test('Empty', () => {
                const args = cli({ numbers: 'number[]' }, [])

                expect(args.numbers).toEqual([])
            })

            test('One item', () => {
                const args = cli({ numbers: 'number[]' }, ['--numbers=1'])

                expect(args.numbers).toEqual([1])
            })

            test('Two items', () => {
                const args = cli({ numbers: 'number[]' }, ['--numbers=1', '--numbers=2'])

                expect(args.numbers).toEqual([1, 2])
            })

            test('Multiple items', () => {
                const args = cli({ numbers: 'number[]' }, ['--numbers=1', '--numbers=2', '--numbers=3'])

                expect(args.numbers).toEqual([1, 2, 3])
            })
        })
    })

    describe('Boolean', () => {
        test('Empty', () => {
            const args = cli({ foo: 'boolean' }, [])

            expect(args.foo).toBeUndefined()
        })

        test('Preset but not filled', () => {
            const args = cli({ foo: 'boolean' }, ['--foo'])

            expect(args.foo).toBeTruthy()
        })

        test('Preset with no value', () => {
            const args = cli({ foo: 'boolean' }, ['--foo='])

            expect(args.foo).toBeTruthy()
        })

        test('Preset with "true" value', () => {
            const args = cli({ foo: 'boolean' }, ['--foo=true'])

            expect(args.foo).toBeTruthy()
        })

        test('Preset with "1" value', () => {
            const args = cli({ foo: 'boolean' }, ['--foo=1'])

            expect(args.foo).toBeTruthy()
        })

        test('Preset with "false" value', () => {
            const args = cli({ foo: 'boolean' }, ['--foo=false'])

            expect(args.foo).toBeFalsy()
        })

        test('Preset with "0" value', () => {
            const args = cli({ foo: 'boolean' }, ['--foo=0'])

            expect(args.foo).toBeFalsy()
        })
    })
})
