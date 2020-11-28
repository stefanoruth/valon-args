import { tab, textGreen, textYellow } from './Color'

describe('Color', () => {
    test('Applies green color', () => {
        expect(textGreen('foo')).toMatchInlineSnapshot(`"[32mfoo[0m"`)
    })

    test('Applies yellow color', () => {
        expect(textYellow('foo')).toMatchInlineSnapshot(`"[33mfoo[0m"`)
    })

    test('Tab size', () => {
        expect(tab).toMatchInlineSnapshot(`"  "`)
    })
})
