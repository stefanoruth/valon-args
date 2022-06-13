import { cliArgs } from './cliArgs'
import stringArgv from 'string-argv'
import { expect } from 'chai'
import sinon, { SinonStub, SinonMock, SinonExpectation } from 'sinon'

let log: SinonStub

describe('Argument Types', () => {
    before(() => {
        log = sinon.stub(console, 'log')
    })

    after(() => {
        log.restore()
    })

    describe('String', () => {
        describe('Required String', () => {
            it('Empty', () => {
                expect(() => cliArgs({ name: { type: 'string', required: true } }, stringArgv(''))).throw()
                expect(log.getCall(0).args[0].message).eql('Required value')
            })

            it('Filled', () => {
                const args = cliArgs({ name: { type: 'string', required: true } }, stringArgv('--name=foo'))

                expect(args.name).eql('foo')
            })
        })

        describe('Optional String', () => {
            it('Empty', () => {
                const args = cliArgs({ name: { type: 'string' } }, stringArgv(''))

                expect(args.name).undefined
            })

            it('Filled', () => {
                const args = cliArgs({ name: { type: 'string' } }, stringArgv('--name=foo'))

                expect(args.name).eql('foo')
            })
        })

        describe('Multilpe Strings', () => {
            it('Empty', () => {
                const args = cliArgs({ names: { type: 'string', array: true } }, stringArgv(''))

                expect(args.names).eql([])
            })

            it('One item', () => {
                const args = cliArgs({ names: { type: 'string', array: true } }, stringArgv('--names=foo'))

                expect(args.names).eql(['foo'])
            })

            it('Two items', () => {
                const args = cliArgs({ names: { type: 'string', array: true } }, stringArgv('--names=foo --names=bar'))

                expect(args.names).eql(['foo', 'bar'])
            })

            it('Multiple items', () => {
                const args = cliArgs(
                    { names: { type: 'string', array: true } },
                    stringArgv('--names=foo --names=bar --names=baz')
                )

                expect(args.names).eql(['foo', 'bar', 'baz'])
            })

            it('Multiple values in the same arg', () => {
                const args = cliArgs({ names: { type: 'string', array: true } }, stringArgv('--names foo bar baz'))

                expect(args.names).eql(['foo', 'bar', 'baz'])
            })
        })
    })

    describe('Number', () => {
        describe('Required Number', () => {
            it('Empty', () => {
                expect(() => cliArgs({ age: { type: 'number', required: true } }, stringArgv(''))).throw()
                // expect(mockExit).toHaveBeenCalledWith(1)
                // expect(mockLog.mock.calls[0][0]).toMatchInlineSnapshot(`
                //     Object {
                //       "args": Object {},
                //       "key": "age",
                //       "rule": Object {
                //         "key": "age",
                //         "required": true,
                //         "type": "number",
                //       },
                //     }
                // `)
            })

            it('Invalid number argument', () => {
                expect(() => cliArgs({ age: { type: 'number', required: true } }, stringArgv('--age=foo'))).throw()

                // expect(mockExit).toHaveBeenCalledWith(1)
                // expect(mockLog.mock.calls[0][0]).toMatchInlineSnapshot(`
                //     "[33mError:[0m
                //       Invalid Number Argument: \\"foo\\""
                // `)
            })

            it('Filled', () => {
                const args = cliArgs({ age: { type: 'number', required: true } }, stringArgv('--age=24'))

                expect(args.age).eql(24)
            })
        })

        describe('Optional Number', () => {
            it('Empty', () => {
                const args = cliArgs({ age: { type: 'number' } }, stringArgv(''))

                expect(args.age).undefined
            })

            it('Filled', () => {
                const args = cliArgs({ age: { type: 'number' } }, stringArgv('--age=24'))

                expect(args.age).eql(24)
            })
        })

        describe('Multilpe  Numbers', () => {
            it('Empty', () => {
                const args = cliArgs({ numbers: { type: 'number', array: true } }, stringArgv(''))

                expect(args.numbers).eql([])
            })

            it('One item', () => {
                const args = cliArgs({ numbers: { type: 'number', array: true } }, stringArgv('--numbers=1'))

                expect(args.numbers).eql([1])
            })

            it('Two items', () => {
                const args = cliArgs(
                    { numbers: { type: 'number', array: true } },
                    stringArgv('--numbers=1 --numbers=2')
                )

                expect(args.numbers).eql([1, 2])
            })

            it('Multiple items', () => {
                const args = cliArgs(
                    { numbers: { type: 'number', array: true } },
                    stringArgv('--numbers=1 --numbers=2 --numbers=3')
                )

                expect(args.numbers).eql([1, 2, 3])
            })
        })
    })

    describe('Boolean', () => {
        it('Empty', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv(''))

            expect(args.foo).undefined
        })

        it('Preset but not filled', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo'))

            expect(args.foo).true
        })

        it('Preset with no value', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo='))

            expect(args.foo).true
        })

        it('Preset with "true" value', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo=true'))

            expect(args.foo).true
        })

        it('Preset with "1" value', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo=1'))

            expect(args.foo).true
        })

        it('Preset with "false" value', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo=false'))

            expect(args.foo).false
        })

        it('Preset with "0" value', () => {
            const args = cliArgs({ foo: { type: 'boolean' } }, stringArgv('--foo=0'))

            expect(args.foo).false
        })
    })
})
