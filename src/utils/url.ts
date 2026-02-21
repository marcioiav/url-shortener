
import isUrl from 'is-url-superb'

export function assertValidUrl(u: string) {
  if (!isUrl(u)) {
    const err = new Error('URL inválida')
    // @ts-ignore
    err.status = 400
    throw err
  }
}
