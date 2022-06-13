export function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export const testMode = process.env.NODE_ENV === 'testing'
