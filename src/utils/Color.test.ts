import { tab, textGreen, textYellow } from './Color'
import { describe, expect, test } from 'vitest'

describe('Color', () => {
    test('Applies green color', () => {
        expect(textGreen('foo')).eql('\u001b[32mfoo\u001b[0m')
    })

    test('Applies yellow color', () => {
        expect(textYellow('foo')).eql('\u001b[33mfoo\u001b[0m')
    })

    test('Tab size', () => {
        expect(tab).eql('  ')
    })
})
