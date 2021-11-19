import { parseStringArgument, StringRule } from './StringRule'
import { RuleWithKey } from './types'

describe('Parseing of Argument', () => {
    describe('String', () => {
        test('Invalid type', () => {
            expect(() => parseStringArgument({ type: 'number' } as any, undefined)).toThrow('Invalid Rule Type')
        })

        test('Optional', () => {
            const rule: RuleWithKey<StringRule> = { type: 'string', key: 'arg' }

            expect(parseStringArgument(rule, undefined)).toBe(undefined)
            expect(() => parseStringArgument(rule, [])).toThrow('Invalid value format')
            expect(parseStringArgument(rule, 'foo')).toBe('foo')
        })

        test('Required', () => {
            const rule: RuleWithKey<StringRule> = { type: 'string', key: 'arg', required: true }

            expect(() => parseStringArgument(rule, undefined)).toThrow('Value is required')
            expect(() => parseStringArgument(rule, [])).toThrow('Invalid value format')
            expect(parseStringArgument(rule, 'foo')).toBe('foo')
        })

        test('Array', () => {
            const rule: RuleWithKey<StringRule> = { type: 'string', key: 'arg', array: true }

            expect(parseStringArgument(rule, undefined)).toEqual([])
            expect(() => parseStringArgument({ ...rule, required: true }, undefined)).toThrow('Value is required')
            expect(parseStringArgument(rule, 'foo')).toEqual(['foo'])
            expect(parseStringArgument(rule, ['foo', 'bar'])).toEqual(['foo', 'bar'])
        })
    })
})
