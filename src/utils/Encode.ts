import * as crypto from 'crypto'

export const encode = (phrase: string): string => {
  const encodeUtf8 = new TextEncoder().encode(phrase)
  const phraseSha256 = crypto
    .createHash('sha256')
    .update(encodeUtf8)
    .digest('base64')
  return phraseSha256
}
