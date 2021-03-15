import { capFirstLetter } from './cap-first-letter'

export const cssMod = (value: string) => ({ [capFirstLetter(value)]: true })
