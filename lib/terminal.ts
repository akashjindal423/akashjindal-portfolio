/**
 * Commands for the interactive hero terminal. Output is built only from
 * lib/content.ts and lib/lab/items.ts so it never says anything the rest of
 * the site doesn't.
 */
import { employerName, getExperience, getProjects, getSkillGroups, getTraining } from './content'
import { LAB_ITEMS } from './lab/items'
import { CONTACT_EMAIL } from './site'
import { GITHUB_URL, LINKEDIN_URL } from './structured-data'

export type Tone = 'default' | 'key' | 'muted' | 'ok' | 'error' | 'heading'

export interface TermLine {
  text: string
  tone?: Tone
  /** Optional link rendered after the text. External URLs open in a new tab. */
  link?: { label: string; href: string }
}

export const COMMANDS = ['help', 'about', 'projects', 'experience', 'skills', 'contact', 'why-hire', 'clear'] as const
export type Command = (typeof COMMANDS)[number]

const DESCRIPTIONS: Record<Command, string> = {
  help: 'list commands',
  about: 'who I am',
  projects: 'selected work and side projects',
  experience: 'roles, newest first',
  skills: 'core skills by group',
  contact: 'email, LinkedIn, GitHub',
  'why-hire': 'the short version',
  clear: 'reset the terminal',
}

// A Map, not a plain object: a plain-object lookup would resolve "constructor",
// "__proto__", "toString" and other inherited keys to built-ins.
const ALIASES = new Map<string, Command>([
  ['?', 'help'],
  ['ls', 'help'],
  ['whoami', 'about'],
  ['cls', 'clear'],
  ['why', 'why-hire'],
  ['whyhire', 'why-hire'],
  ['why hire', 'why-hire'],
  ['work', 'projects'],
  ['cv', 'experience'],
])

const COMMAND_SET: ReadonlySet<string> = new Set(COMMANDS)

/** Normalise input and map it to a command, or undefined if it isn't one. */
export function resolveCommand(input: string): Command | undefined {
  const key = input.trim().toLowerCase().replace(/\s+/g, ' ')
  if (COMMAND_SET.has(key)) return key as Command
  return ALIASES.get(key)
}

function year(ym: string) {
  return ym.slice(0, 4)
}

function run(command: Command): TermLine[] {
  switch (command) {
    case 'help':
      return [
        { text: 'Available commands:', tone: 'heading' },
        ...COMMANDS.map((c) => ({ text: `${c.padEnd(11)} ${DESCRIPTIONS[c]}`, tone: 'default' as const })),
        { text: 'Tip: ↑ and ↓ recall previous commands.', tone: 'muted' },
      ]
    case 'about': {
      const [current] = getExperience()
      return [
        { text: 'Akash Jindal · AI Product Owner · Bristol, UK', tone: 'heading' },
        {
          text: `${current.role} in the AI Centre of Excellence at ${current.company}, working on Generative AI and Gen BI.`,
        },
        { text: 'Previously Dyson, and Infosys, including SSE and Sony Interactive Entertainment via Infosys.' },
        { text: '', link: { label: 'Read the full story', href: '/about' } },
      ]
    }
    case 'projects': {
      const { official, passion } = getProjects()
      return [
        { text: 'Work', tone: 'heading' },
        ...official.map((p) => ({
          text: `${employerName(p)}: ${p.title}`,
          link: p.externalUrl ? { label: 'press', href: p.externalUrl } : undefined,
        })),
        { text: 'Side projects', tone: 'heading' },
        ...passion.map((p) => ({ text: p.title, link: { label: 'open', href: `/projects/${p.slug}` } })),
        ...LAB_ITEMS.map((item) => ({ text: `Lab: ${item.title}`, link: { label: 'try it', href: item.href } })),
      ]
    }
    case 'experience':
      return [
        ...getExperience().map((e) => ({
          text: `${year(e.startDate)}–${e.current ? 'now ' : year(e.endDate ?? e.startDate)}  ${e.role} · ${employerName(e)}`,
        })),
        { text: '', link: { label: 'Full history', href: '/experience' } },
      ]
    case 'skills':
      return getSkillGroups().flatMap((g) => [
        { text: g.category, tone: 'heading' as const },
        { text: g.skills.join(' · ') },
      ])
    case 'contact':
      return [
        { text: 'email   ', tone: 'key', link: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` } },
        { text: 'linkedin', tone: 'key', link: { label: 'akash--jindal', href: LINKEDIN_URL } },
        { text: 'github  ', tone: 'key', link: { label: 'akashjindal423', href: GITHUB_URL } },
        { text: '', link: { label: 'Contact page', href: '/contact' } },
      ]
    case 'why-hire': {
      const certs = getTraining()
        .filter((t) => ['google-gen-ai-leader', 'google-ace', 'pspo-ii'].includes(t.slug))
        .map((t) => t.title)
      return [
        { text: 'The short version:', tone: 'heading' },
        { text: "› Product Owner for Gen BI in Lloyds Banking Group's AI Centre of Excellence, replacing manual reports with reporting colleagues can question in plain English, across four business areas." },
        { text: '› 9+ years in tech, 6+ as a Product Owner, across banking, energy, gaming and consumer tech.' },
        { text: "› Led Dyson's first Augmented Reality experience (CleanTrace). Via Infosys, Product Owner for ITSM and ServiceNow at Sony in the run-up to the PlayStation 5 launch." },
        { text: '› Builds things too: PromptLab, an open-source prompt diagnosis CLI.' },
        { text: `› ${certs.join(', ')}.` },
        { text: '', link: { label: 'Get in touch', href: '/contact' } },
      ]
    }
    case 'clear':
      return []
    default:
      return []
  }
}

export type TermResult = { kind: 'empty' } | { kind: 'clear' } | { kind: 'output'; lines: TermLine[] }

function notFound(text: string): TermResult {
  return {
    kind: 'output',
    lines: [{ text: `command not found: ${text.slice(0, 40)}. Type "help" for the list.`, tone: 'error' }],
  }
}

/** Run one line of terminal input. Always returns a result; never throws. */
export function execute(input: string): TermResult {
  const text = typeof input === 'string' ? input.trim() : ''
  if (!text) return { kind: 'empty' }
  const command = resolveCommand(text)
  if (!command) return notFound(text)
  if (command === 'clear') return { kind: 'clear' }
  try {
    const lines = run(command)
    return Array.isArray(lines) ? { kind: 'output', lines } : notFound(text)
  } catch {
    return { kind: 'output', lines: [{ text: 'Something went wrong running that command. Try "help".', tone: 'error' }] }
  }
}
