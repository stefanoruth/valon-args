import { expect } from 'chai'
import { tab, textGreen, textYellow } from './Color'

describe('Color', () => {
    it('Applies green color', () => {
        expect(textGreen('foo')).eql('\u001b[32mfoo\u001b[0m')
    })

    it('Applies yellow color', () => {
        expect(textYellow('foo')).eql('\u001b[33mfoo\u001b[0m')
    })

    it('Tab size', () => {
        expect(tab).eql('  ')
    })
})
