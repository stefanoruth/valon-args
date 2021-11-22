import { RuleWithKey, StringRule } from './types'
import { parseStringRule } from './StringRule'

describe('Parseing of Argument', () => {
    describe('String', () => {
        test('Optional', () => {
            const rule: RuleWithKey<StringRule> = { type: 'string', key: 'arg' }

            expect(parseStringRule(rule, undefined)).toBe(undefined)
            expect(() => parseStringRule(rule, [])).toThrow('Invalid value format')
            expect(parseStringRule(rule, 'foo')).toBe('foo')
        })

        test('Required', () => {
            const rule: RuleWithKey<StringRule> = { type: 'string', key: 'arg', required: true }

            expect(() => parseStringRule(rule, undefined)).toThrow('Value is required')
            expect(() => parseStringRule(rule, [])).toThrow('Invalid value format')
            expect(parseStringRule(rule, 'foo')).toBe('foo')
        })

        test('Array', () => {
            const rule: RuleWithKey<StringRule> = { type: 'string', key: 'arg', array: true }

            expect(parseStringRule(rule, undefined)).toEqual([])
            expect(() => parseStringRule({ ...rule, required: true }, undefined)).toThrow('Value is required')
            expect(parseStringRule(rule, 'foo')).toEqual(['foo'])
            expect(parseStringRule(rule, ['foo', 'bar'])).toEqual(['foo', 'bar'])
        })
    })
})
