import { tab, textYellow } from './Color'

export function displayError(err: Error) {
    const output = [textYellow('Error:'), `${tab}${err.message}`]

    return output.join('\n')
}
