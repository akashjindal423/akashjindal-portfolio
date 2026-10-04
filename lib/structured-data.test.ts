import { describe, expect, it } from 'vitest'
import { personSchema, profilePageSchema } from './structured-data'
import { SITE_URL } from './site'

describe('structured data', () => {
  it('describes the homepage Person', () => {
    const person = personSchema()
    expect(person['@context']).toBe('https://schema.org')
    expect(person['@type']).toBe('Person')
    expect(person['@id']).toBe(`${SITE_URL}/#person`)
    expect(person.name).toBe('Akash Jindal')
  })

  it('makes /about a ProfilePage whose main entity is the same Person', () => {
    const page = profilePageSchema()
    expect(page['@context']).toBe('https://schema.org')
    expect(page['@type']).toBe('ProfilePage')
    expect(page.url).toBe(`${SITE_URL}/about`)
    expect(page.mainEntity['@type']).toBe('Person')
    expect(page.mainEntity['@id']).toBe(personSchema()['@id'])
    expect(page.mainEntity.name).toBe('Akash Jindal')
    expect(page.mainEntity).not.toHaveProperty('@context')
  })
})
