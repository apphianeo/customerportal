/**
 * Postal code → address lookup, via OneMap.
 *
 * Singapore postal codes are a unique 6-digit key for a building, so the
 * street address can be derived rather than typed. OneMap is the government's
 * mapping service; the search endpoint needs no API key and sends
 * `Access-Control-Allow-Origin: *`, so it can be called straight from the
 * browser.
 *
 * If the request fails — offline, or the service is down — the user simply
 * types the address themselves. Never block them on it.
 */

const ONEMAP_SEARCH = 'https://www.onemap.gov.sg/api/common/elastic/search'

export type PostalAddress = {
  /** Block and street, e.g. "123 Simei Street 1". Unit is never known. */
  address: string
}

type OneMapResult = {
  BLK_NO?: string
  ROAD_NAME?: string
  BUILDING?: string
  ADDRESS?: string
  POSTAL?: string
}

/** Singapore postal codes are exactly six digits. */
export const isCompletePostalCode = (value: string) => /^\d{6}$/.test(value.trim())

export async function lookupPostalCode(code: string): Promise<PostalAddress | null> {
  const postal = code.trim()
  if (!isCompletePostalCode(postal)) return null

  const url =
    `${ONEMAP_SEARCH}?searchVal=${postal}&returnGeom=N&getAddrDetails=Y&pageNum=1`

  try {
    const response = await fetch(url)
    if (!response.ok) return null
    const data: { results?: OneMapResult[] } = await response.json()
    const results = data.results ?? []
    // Exact postal match only — the search is fuzzy and will happily return
    // nearby buildings for a code that does not exist.
    const matches = results.filter(r => r.POSTAL === postal)
    if (matches.length === 0) return null

    // Prefer the plain street entry over a named building
    const best = matches.find(r => !r.BUILDING || r.BUILDING === 'NIL') ?? matches[0]
    const street = [best.BLK_NO, best.ROAD_NAME].filter(Boolean).join(' ').trim()
    if (!street) return null

    // The address fields are upper case, and OneMap already shouts
    return { address: street.toUpperCase() }
  } catch {
    // Network problem — leave the field to the user
    return null
  }
}
