import { expect } from 'chai'
import { parseStringRule } from './StringRule'
import { parseNumberRule } from './NumberRule'
import { parseBooleanRule } from './BooleanRule'
import { BooleanRule, NumberRule, StringRule } from '../types'

describe('Parseing of Argument', () => {
    describe('String', () => {
        it('Optional', () => {
            const rule: StringRule = { type: 'string' }

            expect(parseStringRule(rule, undefined)).undefined
            expect(parseStringRule(rule, [])).undefined
            expect(parseStringRule(rule, 'foo')).to.eql('foo')
        })

        it('Required', () => {
            const rule: StringRule = { type: 'string', required: true }

            expect(() => parseStringRule(rule, undefined)).throw('Required value')
            expect(() => parseStringRule(rule, [])).to.throw('Required value')
            expect(parseStringRule(rule, 'foo')).to.eql('foo')
        })

        it('Array', () => {
            const rule: StringRule = { type: 'string', array: true }

            expect(parseStringRule(rule, undefined)).to.eql([])
            expect(() => parseStringRule({ ...rule, required: true }, undefined)).throw('Required value')
            expect(parseStringRule(rule, 'foo')).to.eql(['foo'])
            expect(parseStringRule(rule, ['foo', 'bar'])).to.eql(['foo', 'bar'])
            expect(parseStringRule({ ...rule, delimiter: ',' }, 'foo, bar')).to.eql(['foo', 'bar'])
        })
    })

    describe('Number', () => {
        it('Optional', () => {
            const rule: NumberRule = { type: 'number' }

            expect(parseNumberRule(rule, undefined)).undefined
            expect(parseNumberRule(rule, '1')).to.eql(1)
            expect(parseNumberRule(rule, [])).undefined
            expect(parseNumberRule(rule, 'abc')).NaN
        })
    })

    describe('Boolean', () => {
        it('Optional', () => {
            const rule: BooleanRule = { type: 'boolean' }

            expect(parseBooleanRule(rule, 'force', {})).undefined
            expect(parseBooleanRule(rule, 'force', { force: undefined })).true
            expect(parseBooleanRule(rule, 'force', { force: '' })).true
            expect(parseBooleanRule(rule, 'force', { force: 'true' })).true
            expect(parseBooleanRule(rule, 'force', { force: '1' })).true
            expect(parseBooleanRule(rule, 'force', { force: 'false' })).false
            expect(parseBooleanRule(rule, 'force', { force: '0' })).false
        })

        it('Required', () => {
            const rule: BooleanRule = { type: 'boolean', required: true }
        })
    })
})
