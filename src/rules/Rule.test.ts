import { parseStringRule } from './StringRule'
import { parseNumberRule } from './NumberRule'
import { parseBooleanRule } from './BooleanRule'
import { BooleanRule, NumberRule, StringRule } from '../types'

describe('Parseing of Argument', () => {
    describe('String', () => {
        test('Optional', () => {
            const rule: StringRule = { type: 'string' }

            expect(parseStringRule(rule, undefined)).toBe(undefined)
            expect(parseStringRule(rule, [])).toBe(undefined)
            expect(parseStringRule(rule, 'foo')).toBe('foo')
        })

        test('Required', () => {
            const rule: StringRule = { type: 'string', required: true }

            expect(() => parseStringRule(rule, undefined)).toThrow('Required value')
            expect(() => parseStringRule(rule, [])).toThrow('Required value')
            expect(parseStringRule(rule, 'foo')).toBe('foo')
        })

        test('Array', () => {
            const rule: StringRule = { type: 'string', array: true }

            expect(parseStringRule(rule, undefined)).toEqual([])
            expect(() => parseStringRule({ ...rule, required: true }, undefined)).toThrow('Required value')
            expect(parseStringRule(rule, 'foo')).toEqual(['foo'])
            expect(parseStringRule(rule, ['foo', 'bar'])).toEqual(['foo', 'bar'])
            expect(parseStringRule({ ...rule, delimiter: ',' }, 'foo, bar')).toEqual(['foo', 'bar'])
        })
    })

    describe('Number', () => {
        test('Optional', () => {
            const rule: NumberRule = { type: 'number' }

            expect(parseNumberRule(rule, undefined)).toBe(undefined)
            expect(parseNumberRule(rule, '1')).toBe(1)
            expect(parseNumberRule(rule, [])).toBe(undefined)
            expect(parseNumberRule(rule, 'abc')).toBe(NaN)
        })
    })

    describe('Boolean', () => {
        test('Optional', () => {
            const rule: BooleanRule = { type: 'boolean' }

            expect(parseBooleanRule(rule, 'force', {})).toBe(undefined)
            expect(parseBooleanRule(rule, 'force', { force: undefined })).toBe(true)
            expect(parseBooleanRule(rule, 'force', { force: '' })).toBe(true)
            expect(parseBooleanRule(rule, 'force', { force: 'true' })).toBe(true)
            expect(parseBooleanRule(rule, 'force', { force: '1' })).toBe(true)
            expect(parseBooleanRule(rule, 'force', { force: 'false' })).toBe(false)
            expect(parseBooleanRule(rule, 'force', { force: '0' })).toBe(false)
        })

        test('Required', () => {
            const rule: BooleanRule = { type: 'boolean', required: true }
        })
    })
})
