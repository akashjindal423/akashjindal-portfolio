import { describe, expect, it } from 'vitest'
import { COMMANDS, execute, resolveCommand, type TermResult } from './terminal'

function lines(result: TermResult) {
  expect(result.kind).toBe('output')
  if (result.kind !== 'output') throw new Error('expected output')
  expect(Array.isArray(result.lines)).toBe(true)
  return result.lines
}

function expectNotFound(input: string) {
  const result = execute(input)
  const out = lines(result)
  expect(out).toHaveLength(1)
  expect(out[0].tone).toBe('error')
  expect(out[0].text).toMatch(/^command not found: /)
}

describe('execute', () => {
  it('returns an empty result for blank input', () => {
    expect(execute('')).toEqual({ kind: 'empty' })
    expect(execute('   ')).toEqual({ kind: 'empty' })
    expect(execute('\t\n')).toEqual({ kind: 'empty' })
  })

  it('runs every listed command and returns defined lines', () => {
    for (const command of COMMANDS) {
      const result = execute(command)
      if (command === 'clear') {
        expect(result).toEqual({ kind: 'clear' })
        continue
      }
      const out = lines(result)
      expect(out.length).toBeGreaterThan(0)
      for (const line of out) expect(typeof line.text).toBe('string')
    }
  })

  it('answers a valid command with its output', () => {
    const out = lines(execute('help'))
    expect(out[0].text).toBe('Available commands:')
  })

  it('resolves aliases', () => {
    expect(resolveCommand('whoami')).toBe('about')
    expect(resolveCommand('why hire')).toBe('why-hire')
    expect(resolveCommand('why   hire')).toBe('why-hire')
    expect(execute('cls')).toEqual({ kind: 'clear' })
  })

  it('reports unknown commands', () => {
    expectNotFound('rm -rf /')
    expectNotFound('sudo hire')
  })

  it('ignores case and surrounding whitespace', () => {
    expect(resolveCommand('HeLp')).toBe('help')
    expect(resolveCommand('  ABOUT  ')).toBe('about')
    expect(resolveCommand('Why-Hire')).toBe('why-hire')
    expect(lines(execute('SKILLS')).length).toBeGreaterThan(0)
  })

  it.each([
    'constructor',
    '__proto__',
    'toString',
    'hasOwnProperty',
    'valueOf',
    'isPrototypeOf',
    '__defineGetter__',
    'CONSTRUCTOR',
    'prototype',
  ])('treats the inherited key %s as an unknown command', (input) => {
    expect(resolveCommand(input)).toBeUndefined()
    expectNotFound(input)
  })

  it('caps the echoed input length', () => {
    const out = lines(execute('x'.repeat(200)))
    expect(out[0].text.length).toBeLessThan(100)
  })
})
