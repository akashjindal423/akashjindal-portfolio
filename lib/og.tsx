import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

interface OgImageInput {
  eyebrow: string
  title: string
  subtitle: string
}

/** Shared 1200x630 Open Graph card in the site's indigo + violet palette. */
export function renderOgImage({ eyebrow, title, subtitle }: OgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#0D0D1A',
          backgroundImage:
            'radial-gradient(ellipse at 15% 0%, rgba(124,58,237,0.35) 0%, rgba(13,13,26,0) 60%)',
          color: '#F8F8FF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              backgroundColor: '#7C3AED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            AJ
          </div>
          <div style={{ fontSize: 28, color: '#A09EC0' }}>akashjindal.com</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#A78BFA',
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 30, color: '#A09EC0', marginTop: 24, maxWidth: 1000, lineHeight: 1.35 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', height: 6, width: 160, borderRadius: 3, backgroundColor: '#7C3AED' }} />
      </div>
    ),
    OG_SIZE,
  )
}
