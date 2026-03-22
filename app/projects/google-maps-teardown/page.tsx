import type { Metadata } from 'next'
import Link from 'next/link'
import Badge from '@/components/shared/Badge'

export const metadata: Metadata = {
  title: 'Google Maps Product Teardown | Akash Jindal',
  description:
    'A deep-dive PM analysis of Google Maps — competitive moat, monetisation flywheel, Local Guides ecosystem, Gemini AI features, and three feature proposals with RICE prioritisation.',
}

export default function GoogleMapsTeardownPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      <Link
        href="/projects"
        className="text-violet-400 hover:text-violet-300 text-sm transition-colors duration-200 inline-block mb-10"
      >
        ← Back to Projects
      </Link>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section>
        <div className="flex flex-wrap gap-2 mb-5">
          {['Published · March 2026', 'Product Teardown', 'Google Maps', '6,000+ words'].map((pill) => (
            <Badge key={pill} variant="accent">{pill}</Badge>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-sans leading-tight text-text-primary">
          Google Maps: A Product Teardown
        </h1>
        <p className="text-lg text-text-muted mt-3">
          By Akash Jindal — Product Owner | AI Centre of Excellence
        </p>
        <p className="text-lg text-text-secondary mt-4 leading-relaxed max-w-3xl">
          A deep-dive PM analysis of Google Maps — examining its competitive moat, monetisation flywheel, the Local Guides community ecosystem, Gemini-powered features, and three feature proposals with wireframes, RICE scores, and success metrics.
        </p>
      </section>

      <div className="border-t border-[var(--border)] mt-12" />

      {/* ── EXECUTIVE SUMMARY ────────────────────────────────────────────── */}
      <section className="mt-16">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Executive Summary</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Overview</h2>
        <div className="border-l-4 border-violet-500 pl-6 py-2 max-w-3xl">
          <p className="text-base text-text-secondary leading-relaxed">
            Google Maps is the most dominant consumer product in the navigation and local discovery space, with over 2 billion monthly active users, approximately 67–70% global market share, and estimated annual revenue exceeding $11 billion. This teardown analyses the product through a product management lens — examining its competitive moat, monetisation flywheel, the Local Guides community ecosystem, and the recently launched Gemini-powered features (Ask Maps and Immersive Navigation). I conclude with three feature proposals I would build next if I were a PM on the Maps team, complete with wireframes, prioritisation rationale, and success metrics.
          </p>
        </div>
      </section>

      {/* ── PRODUCT OVERVIEW ─────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Section 1</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Product Overview</h2>

        <h3 className="text-lg font-semibold text-text-primary mb-3">What Google Maps Actually Is</h3>
        <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-4">
          Google Maps is often described as a navigation app, but that undersells it by an order of magnitude. It is a real-time geospatial intelligence platform that sits at the intersection of five separate product categories: turn-by-turn navigation, local business discovery, user-generated content platform, advertising engine, and developer infrastructure (Maps Platform APIs).
        </p>
        <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-10">
          Each of these five surfaces feeds the others. Navigation generates location data. Location data powers ad targeting. Ad revenue funds Street View cars and satellite imagery. Imagery enables features like Immersive View. Immersive View attracts more users. More users generate more data. This is the core flywheel, and it is extraordinarily difficult to replicate.
        </p>

        <h3 className="text-lg font-semibold text-text-primary mb-4">Key Metrics (2025–2026)</h3>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="bg-violet-600/20 border-b border-violet-500/30">
                {['Metric', 'Value', 'Source'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-violet-300 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Monthly Active Users', '2B+', 'Alphabet earnings, Q3 2024'],
                ['Listed Businesses', '200M+', 'SQ Magazine, Feb 2026'],
                ['Daily Routes Calculated', '1.5B', 'Alphabet Q1 2024'],
                ['Traffic Updates Per Second', '~5M', 'Google blog, Mar 2026'],
                ['Community Contributions/Day', '10M+ (incident reports alone)', 'Google blog, Mar 2026'],
                ['Estimated Annual Revenue', '~$11B+ (desktop + mobile local search)', 'Morgan Stanley estimate'],
                ['Global Market Share', '67–70%', 'StatCounter / SQ Magazine'],
                ['Countries & Territories Covered', '250+', 'Google'],
                ['Local Guides Community', '30M+ contributors', 'Google blog'],
                ['Street View Coverage', '10M+ miles of roads', 'Google'],
                ['Apps Using Maps APIs', '5M+ active apps/websites', 'Google'],
              ].map(([metric, value, source], i) => (
                <tr key={metric} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--background)]/50' : 'bg-[var(--surface)]/70'}`}>
                  <td className="px-4 py-3 font-medium text-text-primary align-top">{metric}</td>
                  <td className="px-4 py-3 text-text-secondary align-top">{value}</td>
                  <td className="px-4 py-3 text-text-muted align-top text-xs">{source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── COMPETITIVE LANDSCAPE ────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Section 2</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Competitive Landscape</h2>

        <h3 className="text-lg font-semibold text-text-primary mb-4">Market Position</h3>
        <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-6">
          Google Maps operates in a market where three players account for the overwhelming majority of usage, and Google controls two of them.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] mb-10">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="bg-violet-600/20 border-b border-violet-500/30">
                {['App', 'Monthly Active Users', 'Market Share (US)', 'Owner'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-violet-300 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Google Maps', '~2B globally', '~67%', 'Google'],
                ['Apple Maps', '~900M globally', '~25%', 'Apple'],
                ['Waze', '~150M globally', '~8%', 'Google (acquired 2013)'],
              ].map(([app, mau, share, owner], i) => (
                <tr key={app} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--background)]/50' : 'bg-[var(--surface)]/70'}`}>
                  <td className="px-4 py-3 font-medium text-text-primary">{app}</td>
                  <td className="px-4 py-3 text-text-secondary">{mau}</td>
                  <td className="px-4 py-3 text-text-secondary">{share}</td>
                  <td className="px-4 py-3 text-text-secondary">{owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-text-muted mb-8">Combined, Google (Maps + Waze) controls approximately 75–80% of the US navigation market.</p>

        <h3 className="text-lg font-semibold text-text-primary mb-4">Competitive Moat Analysis</h3>
        <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-6">
          I see Google Maps' moat as built from five reinforcing layers, each of which would take a competitor years and billions of dollars to replicate:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            {
              label: 'Layer 1 — Data Density',
              body: 'Google Maps collects location data from over 2 billion active devices. Every Android phone with location services enabled is a passive data source. This creates real-time traffic maps with resolution that no competitor can match. Apple Maps processes roughly 3 billion requests daily, but it is confined to iOS devices — roughly 28% of the global smartphone market. Google gets data from both platforms.',
            },
            {
              label: 'Layer 2 — Street View & Imagery Infrastructure',
              body: 'Google has been driving Street View cars since 2007. The result is 10+ million miles of road-level imagery across 100+ countries. This imagery now powers Immersive Navigation\'s 3D views (launched March 2026). Apple\'s equivalent, Look Around, covers significantly fewer cities. Building this from scratch would cost billions and take over a decade.',
            },
            {
              label: 'Layer 3 — Local Guides (Crowdsourced Data Army)',
              body: '30+ million Local Guides contribute reviews, photos, fact-checks, and place edits. This creates a self-reinforcing quality loop: more contributions → better data → more users → more contributors.',
            },
            {
              label: 'Layer 4 — Developer Platform Lock-In',
              body: 'Over 5 million apps and websites integrate Google Maps APIs. Switching costs for developers are enormous — rebuilding geolocation, routing, Places API, and Street View integrations touches every layer of an application. This B2B lock-in is perhaps the least discussed but most durable part of the moat.',
            },
            {
              label: 'Layer 5 — Gemini AI Integration',
              body: 'The March 2026 launch of Ask Maps and Immersive Navigation demonstrates how Google\'s proprietary AI models (Gemini) can be layered on top of Maps\' data assets in ways competitors cannot match. Apple does not have an equivalent foundation model at this scale. This is a new moat layer that is only months old but likely to deepen rapidly.',
            },
          ].map((card) => (
            <div key={card.label} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
              <h4 className="text-sm font-bold text-violet-300 mb-3">{card.label}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-4">Where Competitors Have Genuine Advantages</h3>
        <p className="text-sm text-text-muted mb-4 italic">It would be intellectually dishonest to ignore where Google Maps is genuinely weak:</p>
        <div className="space-y-4">
          {[
            {
              label: 'Apple Maps — Privacy and Ecosystem Integration',
              body: 'Apple Maps processes location data on-device using differential privacy. For privacy-conscious users, this is a real differentiator. Apple Maps also integrates more deeply with iOS features (Siri, widgets, CarPlay default) and has a noticeably cleaner UI with less visual clutter.',
            },
            {
              label: 'Waze — Community Engagement and Speed Trap Culture',
              body: 'Waze has built a reporting culture that Google Maps has never replicated despite owning the company since 2013. 92% of rideshare drivers use Waze specifically for speed trap and police alerts. The gamification of reporting (points, rankings, avatars) creates genuine emotional engagement. Users consider Waze approximately 30% more effective than Google Maps for real-time hazard alerts.',
            },
            {
              label: 'Citymapper / Moovit — Public Transport UX',
              body: 'For multimodal urban transit, specialist apps like Citymapper still offer superior UX in supported cities, with real-time departure boards, disruption routing, and journey comparison across bus/tube/bike/scooter.',
            },
          ].map((item) => (
            <div key={item.label} className="border border-[var(--border)] rounded-xl p-5">
              <h4 className="text-sm font-semibold text-text-primary mb-2">{item.label}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MONETISATION ─────────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Section 3</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Monetisation Strategy Deep Dive</h2>
        <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-8">
          Google Maps does not charge consumers. Instead, it monetises through three revenue streams that collectively generated an estimated $11B+ in 2023.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              label: 'Revenue Stream 1',
              name: 'Local Search Advertising',
              share: '~70% of Maps Revenue',
              body: 'When you search for "coffee near me" in Google Maps, promoted listings appear at the top of results. These are Google Ads placements that businesses bid on through the same platform used for Search ads. Google Maps has the highest commercial intent of any Google product surface — a user searching Maps is often minutes away from a purchase.',
            },
            {
              label: 'Revenue Stream 2',
              name: 'Maps Platform API Fees',
              share: '~20% of Maps Revenue',
              body: 'Google charges developers for API usage beyond a $200/month free credit. Maps JavaScript API ($7/1,000 loads), Directions API ($5–$10/1,000), Places API ($17–$40/1,000), Geocoding API ($5/1,000), Street View Static ($7/1,000). Uber reportedly spends tens of millions annually on these APIs.',
            },
            {
              label: 'Revenue Stream 3',
              name: 'Google Business Profile',
              share: '~10% (Indirect)',
              body: 'Google Business Profile is free, but functions as a gateway to Google Ads. Once a business claims and optimises their Maps listing, the natural next step is to promote it. Google has built tools that make this friction-free: "Promote" buttons within the GBP dashboard lead directly to Google Ads campaign creation.',
            },
          ].map((card) => (
            <div key={card.name} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col">
              <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-1">{card.label}</p>
              <h4 className="text-sm font-bold text-text-primary mb-1 leading-snug">{card.name}</h4>
              <p className="text-xs text-emerald-400 font-semibold mb-3">{card.share}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <p className="text-xs uppercase tracking-widest text-violet-400 mb-3">Monetisation Flywheel</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8">
          <p className="text-[10px] uppercase tracking-widest text-violet-400 text-center mb-6">Monetisation Flywheel</p>
          {/* Rows 1 & 2 — core flywheel loop */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_28px_1fr_28px_1fr] gap-y-2 gap-x-1 items-center mb-2">
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">2B+ Users</div>
            <span className="text-violet-400 text-sm text-center hidden md:block">→</span>
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">High Commercial Intent</div>
            <span className="text-violet-400 text-sm text-center hidden md:block">→</span>
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">Premium Ad Inventory ($11B+/yr)</div>
          </div>
          <div className="hidden md:grid grid-cols-[1fr_28px_1fr_28px_1fr] gap-x-1 items-center my-1">
            <div className="text-violet-400 text-sm text-center">↑</div>
            <div />
            <div />
            <div />
            <div className="text-violet-400 text-sm text-center">↓</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_28px_1fr_28px_1fr] gap-y-2 gap-x-1 items-center mb-8">
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">Better Product (AI/3D)</div>
            <span className="text-violet-400 text-sm text-center hidden md:block">←</span>
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">More Street View, Data, AI Models</div>
            <span className="text-violet-400 text-sm text-center hidden md:block">←</span>
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">Revenue Reinvested in Infra</div>
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_28px_1fr_28px_1fr] gap-y-2 gap-x-1 items-center mb-3">
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">5M+ Apps</div>
            <span className="text-violet-400 text-sm text-center hidden md:block">→</span>
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">Developer Lock-in</div>
            <span className="text-violet-400 text-sm text-center hidden md:block">→</span>
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">API Revenue (~$2B+/yr)</div>
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_28px_1fr_28px_1fr] gap-y-2 gap-x-1 items-center">
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">200M Listed Businesses</div>
            <span className="text-violet-400 text-sm text-center hidden md:block">→</span>
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">Free GBP Creates Dependency</div>
            <span className="text-violet-400 text-sm text-center hidden md:block">→</span>
            <div className="rounded-xl bg-[#0D0D1A] border border-[var(--border)] p-4 text-center text-xs text-text-primary font-medium">Upsell to Google Ads</div>
          </div>
        </div>
      </section>

      {/* ── LOCAL GUIDES ─────────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Section 4</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Local Guides Ecosystem — A Product Analysis</h2>

        <h3 className="text-lg font-semibold text-text-primary mb-3">How the Programme Works</h3>
        <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-8">
          The Local Guides programme is one of the most underappreciated product management achievements in consumer tech. Google has effectively built a global workforce of 30+ million unpaid contributors who continuously improve the quality of its core product.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">The Point System</h4>
            <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-violet-600/20 border-b border-violet-500/30">
                    {['Contribution Type', 'Points', 'Bonus'].map((h) => (
                      <th key={h} className="text-left px-3 py-2.5 text-[10px] uppercase tracking-widest text-violet-300 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Review', '10', '+10 if >200 characters'],
                    ['Photo', '5', '—'],
                    ['Video', '7', '—'],
                    ['Answer a question', '1', '—'],
                    ['Place edit', '5', '—'],
                    ['Add a new place', '15', '—'],
                    ['Fact check', '1', '—'],
                    ['Rating only', '1', '—'],
                  ].map(([type, pts, bonus], i) => (
                    <tr key={type} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--background)]/50' : 'bg-[var(--surface)]/70'}`}>
                      <td className="px-3 py-2.5 text-text-primary">{type}</td>
                      <td className="px-3 py-2.5 text-violet-300 font-semibold">{pts}</td>
                      <td className="px-3 py-2.5 text-text-muted text-xs">{bonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Level Progression</h4>
            <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-violet-600/20 border-b border-violet-500/30">
                    {['Level', 'Points Required', 'Key Unlock'].map((h) => (
                      <th key={h} className="text-left px-3 py-2.5 text-[10px] uppercase tracking-widest text-violet-300 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['1', '0', 'Basic access'],
                    ['2', '15', 'Community access'],
                    ['3', '75', '—'],
                    ['4', '250', 'Local Guides badge (visible on Maps)'],
                    ['5', '500', '—'],
                    ['6', '1,500', 'Early feature access, event invites'],
                    ['7', '5,000', '—'],
                    ['8', '15,000', '—'],
                    ['9', '50,000', '—'],
                    ['10', '100,000', 'Top-tier recognition'],
                  ].map(([level, points, unlock], i) => (
                    <tr key={level} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--background)]/50' : 'bg-[var(--surface)]/70'}`}>
                      <td className="px-3 py-2.5 text-violet-300 font-bold">{level}</td>
                      <td className="px-3 py-2.5 text-text-secondary">{points}</td>
                      <td className="px-3 py-2.5 text-text-muted text-xs">{unlock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-4">Why This Programme Is Brilliant Product Design</h3>
        <div className="space-y-4 mb-8">
          {[
            {
              title: 'Gamification That Actually Works',
              body: 'Unlike most corporate gamification (which fails because the loop is disconnected from real value), Local Guides works because the contribution is immediately visible. You write a review → it appears on Maps → other users find it helpful → you see view counts rise → you feel ownership. The badge at Level 4 creates a visible social identity, which research shows is a stronger motivator than points.',
            },
            {
              title: 'Free Labour Framed as Community Contribution',
              body: 'Google has positioned what is effectively unpaid data entry as a civic activity. Guides see themselves as "helping their community" rather than "providing free labour to a $2 trillion corporation." This framing is ethically debatable but productively effective.',
            },
            {
              title: 'Quality Enforcement Through Social Pressure',
              body: 'Contributions violating content policies lose points — but more powerfully, the badge system creates reputational stakes. A Level 8 Guide with a visible badge has something to lose, which self-regulates quality.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
              <h4 className="text-sm font-semibold text-text-primary mb-2">{item.title}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-4">Where the Local Guides Programme Falls Short</h3>
        <div className="space-y-3">
          {[
            { title: 'Declining Perks', body: 'Multiple reports indicate that Google has reduced tangible rewards over time. Early guides received Google Drive storage, Udemy discounts, and event invitations. Current high-level guides report receiving very little beyond the badge. This creates a risk of contributor fatigue.' },
            { title: 'No Creator Economy Integration', body: 'In 2026, platforms like TikTok, YouTube, and Instagram have creator funds and monetisation pathways. Google\'s top Local Guides — some with millions of review views — receive nothing. A Level 10 Guide who has written 5,000 reviews and uploaded 10,000 photos has generated enormous value for Google with no economic return.' },
            { title: 'Review Quality Plateau', body: 'The point system incentivises volume over depth. A 1-star rating with no text earns 1 point; a thoughtful 500-word review earns only 20 points. The ratio does not sufficiently reward quality.' },
          ].map((item) => (
            <div key={item.title} className="border border-[var(--border)] rounded-xl p-5">
              <h4 className="text-sm font-semibold text-text-primary mb-2">{item.title}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RECENT PRODUCT STRATEGY ──────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Section 5</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Recent Product Strategy: The March 2026 Gemini Integration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col">
            <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-2">Ask Maps</p>
            <h3 className="text-base font-bold text-text-primary mb-3">Conversational AI Search</h3>
            <div className="space-y-3 flex-1">
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">What it does</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Launched March 12, 2026 in the US and India, Ask Maps is a conversational search interface built on Gemini models. Users type natural language queries like "My phone is dying, where can I charge it without waiting in a long coffee line?" Maps returns personalised answers synthesised from 300M+ places and 500M+ reviewers.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Why this matters</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Ask Maps transforms Google Maps from a search-and-filter tool into a reasoning engine. The shift is from "user provides structured input → system returns ranked results" to "user describes a need → system reasons about context and returns a recommendation." This is a fundamental UX paradigm shift.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">My analysis</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Ask Maps is strategically defensive. Google needed to prevent users from starting their local discovery journey in ChatGPT or Perplexity instead of Maps. By embedding conversational AI into Maps itself, Google keeps users within its monetisable ecosystem.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col">
            <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-2">Immersive Navigation</p>
            <h3 className="text-base font-bold text-text-primary mb-3">3D AI-Powered Navigation</h3>
            <div className="space-y-3 flex-1">
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Key features</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Also launched March 12, 2026 — what Google describes as the biggest navigation update in over a decade. A 3D view reflecting actual buildings, terrain, and overpasses. Highlighted lanes, crosswalks, traffic lights, and stop signs. "Transparent buildings" to preview upcoming turns. Natural voice guidance. Route tradeoff comparisons. Pre-trip destination preview with parking recommendations. Building entrance highlighting on arrival.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">My analysis</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  This is Google weaponising its Street View imagery asset — a moat it has built over 17+ years — through AI. Apple Maps has been catching up on basic navigation, so Google is raising the bar to a level that requires both massive imagery datasets AND advanced AI models. Few companies have both.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── USER JOURNEY MAPPING ─────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Section 6</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">User Journey Mapping</h2>

        <div className="space-y-8">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-3">Journey 1</p>
            <h3 className="text-base font-bold text-text-primary mb-6">"Finding a Restaurant for Tonight" — Discovery Flow</h3>
            <p className="text-xs text-text-muted mb-6 italic">User goal: Find a good restaurant nearby for dinner tonight</p>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-violet-500/30" />
              {[
                {
                  num: 1,
                  title: 'TRIGGER',
                  items: [
                    'User opens Google Maps (or types in Search → redirected to Maps)',
                    'Taps search bar',
                    'Types: "good Indian restaurant near me" or uses Ask Maps: "Where should I eat tonight? I want Indian food, not too fancy, with outdoor seating"',
                  ],
                  highlight: null,
                },
                {
                  num: 2,
                  title: 'RESULTS & EVALUATION',
                  items: [
                    'Maps shows map pins + list view',
                    'Each result shows: name, rating, price band, distance, photos',
                    'Ask Maps version: conversational response with top 3 picks, reasoning ("this one has outdoor seating and 4.6 stars")',
                    'User taps a result → Business profile page',
                    'Reads: reviews, photos, menu, hours, "Popular times" graph',
                  ],
                  highlight: 'Ad results appear at top (monetisation touch)',
                },
                {
                  num: 3,
                  title: 'DECISION',
                  items: [
                    'User reads 3–4 reviews (Local Guides badges visible on quality reviews)',
                    'Checks photos (uploaded by Local Guides)',
                    'Checks "Popular times" to avoid waiting',
                    'Decides on restaurant',
                    'Taps "Directions" or "Reserve a table" (OpenTable integration)',
                  ],
                  highlight: null,
                },
                {
                  num: 4,
                  title: 'NAVIGATION',
                  items: [
                    'Turn-by-turn directions (Immersive Navigation if available)',
                    'Real-time traffic updates',
                    'Arrival: building entrance highlighted, parking suggestions',
                  ],
                  highlight: 'Maps prompts post-arrival: "How was [Restaurant]? Leave a review"',
                },
                {
                  num: 5,
                  title: 'POST-VISIT',
                  items: [
                    'User receives notification to review',
                    'If user is a Local Guide → points earned',
                    'Review feeds back into the system → improves results for next user',
                  ],
                  highlight: null,
                },
              ].map((step) => (
                <div key={step.num} className="relative pl-10 pb-8 last:pb-0">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {step.num}
                  </div>
                  <p className="text-sm font-bold text-text-primary mb-2">{step.title}</p>
                  <ul className="space-y-1.5">
                    {step.highlight && (
                      <li className="flex items-start gap-2">
                        <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-2 py-0.5 shrink-0 mt-0.5">PROMOTED</span>
                        <span className="text-text-muted text-sm">{step.highlight}</span>
                      </li>
                    )}
                    {step.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-violet-400 mt-1.5 text-[8px] shrink-0">●</span>
                        <span className="text-text-muted text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-3">Journey 2</p>
            <h3 className="text-base font-bold text-text-primary mb-6">"Daily Commute" — Navigation Flow</h3>
            <p className="text-xs text-text-muted mb-6 italic">User goal: Get to work efficiently</p>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-violet-500/30" />
              {[
                {
                  num: 1,
                  title: 'TRIGGER',
                  items: [
                    'User taps "Commute" tab or saved "Work" location',
                    'Maps shows: estimated time, traffic conditions, suggested departure time',
                    'Widget on home screen shows live ETA',
                  ],
                },
                {
                  num: 2,
                  title: 'ROUTE SELECTION',
                  items: [
                    'Primary route shown with ETA',
                    'Alternative routes with tradeoffs (new in March 2026): "Route A: 25 min, light traffic" / "Route B: 22 min, toll road (£2.50)" / "Route C: 30 min, scenic, no motorway"',
                    'User selects preferred route',
                  ],
                },
                {
                  num: 3,
                  title: 'ACTIVE NAVIGATION',
                  items: [
                    'Immersive Navigation: 3D buildings, lane guidance',
                    'Real-time disruption alerts: "Crash ahead on M4, +8 min delay" → Automatic alternative suggestion with time comparison',
                    'Smart zoom at complex junctions',
                    'Natural voice: "Go past this exit, take the next one"',
                    'Community-sourced updates (10M+ daily contributions)',
                  ],
                },
                {
                  num: 4,
                  title: 'ARRIVAL',
                  items: [
                    'Building entrance highlighted',
                    'Parking recommendations (if applicable)',
                    'Journey logged for future commute predictions',
                  ],
                },
              ].map((step) => (
                <div key={step.num} className="relative pl-10 pb-8 last:pb-0">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {step.num}
                  </div>
                  <p className="text-sm font-bold text-text-primary mb-2">{step.title}</p>
                  <ul className="space-y-1.5">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-violet-400 mt-1.5 text-[8px] shrink-0">●</span>
                        <span className="text-text-muted text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE PROPOSALS HEADER ─────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Section 7</p>
        <h2 className="text-2xl font-bold text-text-primary mb-2">What I Would Build Next: Three Feature Proposals</h2>
        <p className="text-base text-text-muted">Each proposal includes problem definition, solution, ASCII wireframe, success metrics, and RICE prioritisation.</p>
      </section>

      {/* ── FEATURE PROPOSAL A ───────────────────────────────────────────── */}
      <section className="mt-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold px-3 py-1 border border-violet-500/30 rounded-full">Feature Proposal A</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-6">"Local Guide Creator Fund"</h3>

        {/* Problem */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6">
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-2">The Problem</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Google Maps' competitive moat depends on 30M+ Local Guides contributing free content. But contributor motivation is declining — perks have been reduced, and competing platforms now pay creators. The average Local Guide at Level 6+ has contributed hundreds of hours of work. If even 10% of high-level guides become inactive, it would measurably impact data freshness.
          </p>
        </div>

        {/* Solution */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-2">The Solution</p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-3xl mb-4">
            Launch a "Local Guide Creator Fund" — a revenue-sharing programme for the top tier of contributors (Level 7+). Eligible guides earn a share of ad revenue generated from places they have reviewed or photographed. The mechanism would work similarly to YouTube's Partner Programme: Google already knows which business listings drive ad clicks, and which reviews/photos appear on those listings. Connecting these data points is an engineering task, not a conceptual leap.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-violet-600/20 border-b border-violet-500/30">
                  {['Tier', 'Requirement', 'Revenue Share'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-violet-300 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Silver', 'Level 7 + 100 reviews with >50 "helpful" votes', '£50/month ad credit or equivalent'],
                  ['Gold', 'Level 8 + 500 reviews + 1,000 photos', 'Pro-rata share of ad revenue on reviewed places'],
                  ['Platinum', 'Level 9+ + verified expertise badge', 'Direct sponsorship opportunities with listed businesses'],
                ].map(([tier, req, share], i) => (
                  <tr key={tier} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--background)]/50' : 'bg-[var(--surface)]/70'}`}>
                    <td className="px-4 py-3 font-semibold text-text-primary">{tier}</td>
                    <td className="px-4 py-3 text-text-secondary">{req}</td>
                    <td className="px-4 py-3 text-text-secondary">{share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wireframe */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-violet-400 mb-3">Wireframe — Creator Dashboard</p>
          <div className="rounded-2xl p-1 bg-gradient-to-b from-violet-500/10 to-transparent border border-violet-500/20">
            <div className="bg-[#0A0A1A] rounded-2xl p-5 space-y-5">
              {/* Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-full px-3 py-1 text-xs text-text-muted mb-1">
                  <span>📊</span> Local Guides Creator Dashboard
                </div>
                <p className="text-[10px] text-text-muted">March 2026</p>
              </div>
              {/* Earnings row */}
              <div className="flex flex-col sm:flex-row gap-3">
                {[
                  { value: '£47.20', label: 'Earnings (est.)' },
                  { value: '2,340', label: 'Views on Reviews' },
                  { value: '89', label: '"Helpful" Votes' },
                ].map((stat) => (
                  <div key={stat.label} className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
              {/* Top Performing Contributions */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-3">📝 Top Performing Contributions</p>
                <div className="space-y-0">
                  {[
                    { name: '"Pipal Tree Cafe" review', detail: '4.5★ · 347 words · 12 photos', views: '1,240 views', earned: '£8.30 earned' },
                    { name: '"Clifton Village Walk" list', detail: '8 places curated', views: '890 views', earned: '£5.10 earned' },
                    { name: '"No.1 Harbourside" photos', detail: '24 photos uploaded', views: '2,100 views', earned: '£3.90 earned' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                      <div>
                        <p className="text-xs font-medium text-white">{item.name}</p>
                        <p className="text-[10px] text-text-muted">{item.detail}</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <p className="text-xs text-text-muted">→ {item.views}</p>
                        <p className="text-xs text-emerald-400 font-medium">{item.earned}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Contribution Opportunities */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-3">🎯 Contribution Opportunities</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3">
                    <span className="text-violet-400 text-base shrink-0">⚡</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white">New restaurant: Honest Burgers, Park St</p>
                      <p className="text-[10px] text-text-muted">Be first to review</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5 shrink-0">3x multiplier</span>
                  </div>
                  <div className="flex items-start gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3">
                    <span className="text-violet-400 text-base shrink-0">📸</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white">Photos needed: The Downs Café</p>
                      <p className="text-[10px] text-text-muted">Interior photos missing</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5 shrink-0">bonus £2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-3">Success Metrics</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Primary', text: 'Monthly active contributors among Level 7+ (target: +25% within 6 months)' },
              { label: 'Secondary', text: 'Average review quality score (word count, photo inclusion, "helpful" votes)' },
              { label: 'Guardrail', text: 'Spam/low-quality review rate (must not increase)' },
            ].map((m) => (
              <div key={m.label} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-1">{m.label}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RICE */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-3">RICE Score</p>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-violet-600/20 border-b border-violet-500/30">
                  {['Factor', 'Score', 'Reasoning'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-violet-300 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Reach', '8/10', 'Affects 30M+ contributors and all Maps users who read reviews'],
                  ['Impact', '9/10', 'Directly strengthens Maps\' core competitive moat'],
                  ['Confidence', '6/10', 'Revenue share model is proven (YouTube) but untested for Maps'],
                  ['Effort', '7/10 (high)', 'Requires payment infrastructure, policy framework, abuse prevention'],
                ].map(([factor, score, reasoning], i) => (
                  <tr key={factor} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--background)]/50' : 'bg-[var(--surface)]/70'}`}>
                    <td className="px-4 py-3 font-medium text-text-primary">{factor}</td>
                    <td className="px-4 py-3 text-violet-300 font-semibold">{score}</td>
                    <td className="px-4 py-3 text-text-secondary">{reasoning}</td>
                  </tr>
                ))}
                <tr className="bg-violet-600/10 border-t border-violet-500/30">
                  <td className="px-4 py-3 font-bold text-text-primary">RICE Score</td>
                  <td className="px-4 py-3 font-bold text-violet-300 text-base">9.3</td>
                  <td className="px-4 py-3 text-text-muted text-xs">(8 × 9 × 0.6) / 7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FEATURE PROPOSAL B ───────────────────────────────────────────── */}
      <section className="mt-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold px-3 py-1 border border-violet-500/30 rounded-full">Feature Proposal B</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-6">"Group Trip Planner" with Collaborative Itinerary</h3>

        {/* Problem */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6">
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-2">The Problem</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Planning a trip with multiple people is one of the most common Maps-adjacent use cases, yet Google Maps has no collaborative planning feature. Users currently resort to shared Google Docs, WhatsApp threads, or third-party tools like Wanderlog. This is a missed opportunity to increase Maps engagement time and capture trip-planning ad revenue. Ask Maps (launched March 2026) can answer individual planning questions, but it cannot coordinate preferences across a group.
          </p>
        </div>

        {/* Solution */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-2">The Solution</p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-3xl mb-6">
            Build a "Group Trip" feature within Maps that lets users create a shared trip, invite friends/family, and collaboratively build an itinerary. Integrate with Ask Maps so the AI can reconcile different preferences ("Priya wants vegetarian food, Raj wants a pub, and you want somewhere walkable from the hotel — here are 3 options that work for everyone").
          </p>
        </div>

        {/* User Flow + Wireframe */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-violet-400 mb-3">User Flow & Wireframe</p>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-5">
            {/* Steps 1 & 2 */}
            <div className="space-y-2 text-sm text-text-secondary">
              <p><span className="font-semibold text-text-primary">Step 1 — Create Trip:</span> User taps "+" → "New Group Trip", names it "Bristol Weekend with Friends", sets dates March 28–30.</p>
              <p><span className="font-semibold text-text-primary">Step 2 — Invite Collaborators:</span> Share link via WhatsApp / SMS / email. Each person joins with their Google account.</p>
            </div>
            {/* Step 3 — Wireframe mock */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-text-muted mb-3">Step 3 — Collaborative Planning</p>
              <div className="rounded-2xl p-1 bg-gradient-to-b from-violet-500/10 to-transparent border border-violet-500/20">
                <div className="bg-[#0A0A1A] rounded-2xl overflow-hidden">
                  {/* Header band */}
                  <div className="bg-gradient-to-r from-violet-600/20 to-blue-600/20 px-4 py-3">
                    <p className="text-sm font-semibold text-white">🗺️ Bristol Weekend · 4 people</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-[10px] uppercase tracking-widest text-text-muted">📅 Saturday, March 28</p>
                    {/* 10:00 */}
                    <div className="flex items-start gap-3 py-3 border-b border-[var(--border)]">
                      <span className="text-[10px] text-text-muted w-10 shrink-0 pt-0.5">10:00</span>
                      <span className="text-base shrink-0">🏛️</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">SS Great Britain</p>
                        <p className="text-[10px] text-text-muted">Added by: Akash · ❤️ 3 votes</p>
                      </div>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5 shrink-0">✓ Confirmed</span>
                    </div>
                    {/* 13:00 */}
                    <div className="flex items-start gap-3 py-3 border-b border-[var(--border)]">
                      <span className="text-[10px] text-text-muted w-10 shrink-0 pt-0.5">13:00</span>
                      <span className="text-base shrink-0">🍽️</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">Vote for lunch spot</p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          <span className="text-[10px] bg-[var(--surface)] border border-[var(--border)] rounded-full px-2 py-0.5 text-text-muted">Pipal Tree Cafe</span>
                          <span className="text-[10px] bg-[var(--surface)] border border-[var(--border)] rounded-full px-2 py-0.5 text-text-muted">The Ox</span>
                          <span className="text-[10px] bg-violet-600 text-white rounded-full px-2 py-0.5">Cargo Cantina</span>
                          <span className="text-[10px] text-violet-400">← Winner</span>
                        </div>
                      </div>
                    </div>
                    {/* 15:00 */}
                    <div className="flex items-start gap-3 py-3 border-b border-[var(--border)]">
                      <span className="text-[10px] text-text-muted w-10 shrink-0 pt-0.5">15:00</span>
                      <span className="text-base shrink-0">💬</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">Ask Maps suggestion</p>
                        <div className="mt-2 bg-violet-500/5 border border-violet-500/20 rounded-lg p-3">
                          <p className="text-xs text-text-muted italic">AI suggests: Banksy walking tour, paddle boarding, Arnolfini gallery</p>
                        </div>
                      </div>
                    </div>
                    {/* 19:00 */}
                    <div className="flex items-start gap-3 py-3">
                      <span className="text-[10px] text-text-muted w-10 shrink-0 pt-0.5">19:00</span>
                      <div className="flex-1 border-dashed border border-[var(--border)] rounded-lg p-3">
                        <p className="text-xs text-text-muted italic">No plans yet — suggest!</p>
                      </div>
                    </div>
                    {/* Footer */}
                    <div className="flex items-center gap-0 border-t border-[var(--border)] pt-3">
                      <span className="flex-1 text-center text-[10px] text-text-muted">💬 Group chat</span>
                      <span className="w-px h-3 bg-[var(--border)]" />
                      <span className="flex-1 text-center text-[10px] text-text-muted">📊 Budget tracker</span>
                      <span className="w-px h-3 bg-[var(--border)]" />
                      <span className="flex-1 text-center text-[10px] text-text-muted">🗺️ View on map</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Steps 4 & 5 */}
            <div className="space-y-2 text-sm text-text-secondary">
              <p><span className="font-semibold text-text-primary">Step 4 — During the Trip:</span> Live location sharing (opt-in), turn-by-turn navigation to each stop, auto-suggest next stop based on itinerary + current location.</p>
              <p><span className="font-semibold text-text-primary">Step 5 — Post-Trip:</span> "Trip Summary" with photos, places visited, total distance. Prompt to review visited places (Local Guides integration). Share summary as a "Trip List" for others to use.</p>
            </div>
          </div>
        </div>

        {/* Monetisation */}
        <div className="border border-amber-500/20 bg-amber-500/5 rounded-xl p-5 mb-6">
          <p className="text-[10px] uppercase tracking-widest text-amber-400 mb-2">Monetisation Potential</p>
          <p className="text-sm text-amber-200/75 leading-relaxed">
            This feature creates new ad surfaces: promoted restaurants/activities within group suggestions, "Sponsored experiences" in Ask Maps group recommendations, and hotel/accommodation upsells integrated into multi-day trip planning.
          </p>
        </div>

        {/* Metrics */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-3">Success Metrics</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Primary', text: 'Trips created per week (target: 1M within 3 months of launch)' },
              { label: 'Secondary', text: 'Average trip participants (target: 3.5+)' },
              { label: 'Revenue', text: 'Incremental ad revenue from trip-planning surfaces' },
              { label: 'Engagement', text: 'Time spent in Maps during trip planning vs current baseline' },
            ].map((m) => (
              <div key={m.label} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-1">{m.label}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RICE */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-3">RICE Score</p>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-violet-600/20 border-b border-violet-500/30">
                  {['Factor', 'Score', 'Reasoning'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-violet-300 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Reach', '9/10', 'Trip planning affects most Maps users; group travel is near-universal'],
                  ['Impact', '7/10', 'High engagement + new monetisation, but not core navigation'],
                  ['Confidence', '7/10', 'Proven by Wanderlog/TripIt success; Google has all technical primitives'],
                  ['Effort', '8/10 (high)', 'Real-time collaboration + Ask Maps integration is complex'],
                ].map(([factor, score, reasoning], i) => (
                  <tr key={factor} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--background)]/50' : 'bg-[var(--surface)]/70'}`}>
                    <td className="px-4 py-3 font-medium text-text-primary">{factor}</td>
                    <td className="px-4 py-3 text-violet-300 font-semibold">{score}</td>
                    <td className="px-4 py-3 text-text-secondary">{reasoning}</td>
                  </tr>
                ))}
                <tr className="bg-violet-600/10 border-t border-violet-500/30">
                  <td className="px-4 py-3 font-bold text-text-primary">RICE Score</td>
                  <td className="px-4 py-3 font-bold text-violet-300 text-base">7.9</td>
                  <td className="px-4 py-3 text-text-muted text-xs">(9 × 7 × 0.7) / 8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FEATURE PROPOSAL C ───────────────────────────────────────────── */}
      <section className="mt-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold px-3 py-1 border border-violet-500/30 rounded-full">Feature Proposal C</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-6">"Neighbourhood Intelligence" — Hyperlocal Insights for Relocators</h3>

        {/* Problem */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6">
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-2">The Problem</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            One of the most consequential location decisions people make is where to live. Google Maps has all the data needed to answer this question — commute times, nearby amenities, school ratings, crime proximity, green space density, noise levels, restaurant density — but presents none of it in a unified way. Users currently cobble together insights from Rightmove, CrimeRate, OFSTED, and Google Maps separately. This is especially painful for immigrants and relocators who lack local knowledge (a demographic I understand personally).
          </p>
        </div>

        {/* Solution */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-2">The Solution</p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-3xl mb-6">
            Build a "Neighbourhood Score" layer in Maps that aggregates existing Google data into a unified, interactive neighbourhood profile.
          </p>

          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-3">Data Sources (All Already Available to Google)</p>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)] mb-6">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="bg-violet-600/20 border-b border-violet-500/30">
                  {['Data Point', 'Google Source'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-violet-300 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Commute time to workplace', 'Maps routing engine'],
                  ['Restaurant/cafe density', 'Places API'],
                  ['Grocery store proximity', 'Places API'],
                  ['Park/green space access', 'Maps land use data'],
                  ['School quality', 'Google search + GOV.UK data'],
                  ['Public transport frequency', 'Transit data'],
                  ['Average review sentiment', 'Local Guides reviews (NLP)'],
                  ['"Popular times" patterns', 'Maps foot traffic data'],
                  ['Street View aesthetics', 'Computer vision on Street View imagery'],
                ].map(([dataPoint, source], i) => (
                  <tr key={dataPoint} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--background)]/50' : 'bg-[var(--surface)]/70'}`}>
                    <td className="px-4 py-3 text-text-primary">{dataPoint}</td>
                    <td className="px-4 py-3 text-text-secondary">{source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wireframe */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-violet-400 mb-3">Wireframe — Neighbourhood Profile</p>
          <div className="rounded-2xl p-1 bg-gradient-to-b from-violet-500/10 to-transparent border border-violet-500/20">
            <div className="bg-[#0A0A1A] rounded-2xl p-5 space-y-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-sm font-bold text-white">🏘️ Neighbourhood: Clifton, Bristol</p>
                <p className="text-2xl font-bold text-violet-400">8.4 / 10</p>
              </div>
              {/* Map placeholder */}
              <div className="relative h-32 rounded-xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-[var(--border)] overflow-hidden">
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                  {[
                    { emoji: '🟢', label: 'Walkability' },
                    { emoji: '🔵', label: 'Transit' },
                    { emoji: '🟡', label: 'Food' },
                    { emoji: '⬜', label: 'Residential' },
                  ].map((item) => (
                    <span key={item.label} className="text-[9px] bg-[#0A0A1A]/80 rounded-full px-2 py-0.5 text-text-muted">
                      {item.emoji} {item.label}
                    </span>
                  ))}
                </div>
              </div>
              {/* Score bars */}
              <div className="space-y-2.5">
                {[
                  { emoji: '🚶', label: 'Walkability', score: 9.1, pct: '91%', color: 'bg-violet-500' },
                  { emoji: '🚌', label: 'Public Transport', score: 7.8, pct: '78%', color: 'bg-blue-400' },
                  { emoji: '🛒', label: 'Daily Amenities', score: 8.5, pct: '85%', color: 'bg-violet-500' },
                  { emoji: '🌳', label: 'Green Space', score: 9.3, pct: '93%', color: 'bg-emerald-400' },
                  { emoji: '🍽️', label: 'Food & Drink', score: 8.9, pct: '89%', color: 'bg-violet-500' },
                  { emoji: '🏫', label: 'Schools', score: 7.2, pct: '72%', color: 'bg-amber-400' },
                  { emoji: '🔇', label: 'Quietness', score: 6.1, pct: '61%', color: 'bg-blue-400' },
                  { emoji: '💷', label: 'Cost of Living', score: 4.8, pct: '48%', color: 'bg-red-400' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-sm shrink-0 w-5">{item.emoji}</span>
                    <span className="text-[10px] text-text-muted w-28 shrink-0">{item.label}</span>
                    <span className="text-[10px] font-semibold text-text-primary w-6 shrink-0">{item.score}</span>
                    <div className="flex-1 bg-[var(--surface)] rounded-full h-2">
                      <div className={`h-2 rounded-full ${item.color}`} style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Compare row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] text-text-muted shrink-0">🔄 Compare with:</span>
                {['Redland', 'Bedminster', 'Bishopston'].map((area) => (
                  <button key={area} className="text-[10px] bg-[var(--surface)] border border-[var(--border)] hover:border-violet-500/50 rounded-full px-3 py-1 text-text-muted transition-colors">
                    {area}
                  </button>
                ))}
              </div>
              {/* Commute row */}
              <div className="flex flex-wrap items-center gap-3 text-[10px] text-text-muted">
                <span className="shrink-0">⏱️ Commute to [Your Workplace]:</span>
                <span>🚗 18 min</span>
                <span>🚌 32 min</span>
                <span>🚲 12 min</span>
              </div>
              {/* Ask Maps result */}
              <div className="border-l-4 border-violet-500 pl-4 bg-violet-500/5 rounded-r-xl p-4">
                <p className="text-[10px] text-violet-400 mb-1 font-semibold">Ask Maps</p>
                <p className="text-xs text-text-muted italic leading-relaxed">
                  "Clifton scores 9.1 for walkability and has 3 supermarkets within 10 min walk. However, parking is limited and rents average £1,200/month for a 1-bed. Consider Bedminster for 30% lower rent with similar walkability scores."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why This Wins */}
        <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-5 mb-6">
          <p className="text-[10px] uppercase tracking-widest text-emerald-400 mb-2">Why This Wins</p>
          <p className="text-sm text-emerald-200/80 leading-relaxed">
            This feature would be transformative for a specific, high-value moment: the relocation decision. Google already has all the data — the insight is simply not aggregated. This feature creates sustained, high-intent engagement (people don't choose a neighbourhood in one session) and opens advertising opportunities for estate agents, removal services, utility providers, and local businesses wanting to attract new residents. For immigrants (a personal lens I bring), this solves a real information asymmetry — deciding between neighbourhoods in a new country without the benefit of local word-of-mouth.
          </p>
        </div>

        {/* Metrics */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-3">Success Metrics</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Primary', text: 'Neighbourhood profile views per month' },
              { label: 'Secondary', text: 'Time spent on neighbourhood comparison' },
              { label: 'Conversion', text: 'Users who search for estate agents / Rightmove within 7 days of viewing' },
              { label: 'Engagement', text: 'Ask Maps queries within neighbourhood context' },
            ].map((m) => (
              <div key={m.label} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-1">{m.label}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RICE */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-3">RICE Score</p>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-violet-600/20 border-b border-violet-500/30">
                  {['Factor', 'Score', 'Reasoning'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-violet-300 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Reach', '6/10', 'Relevant at relocation moments (millions/year) but not daily use'],
                  ['Impact', '9/10', 'High-value, life-decision product moment with no competition'],
                  ['Confidence', '8/10', 'All data exists within Google already; Zillow/Rightmove validate demand'],
                  ['Effort', '5/10 (medium)', 'Data aggregation and UI work; no new data collection needed'],
                ].map(([factor, score, reasoning], i) => (
                  <tr key={factor} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--background)]/50' : 'bg-[var(--surface)]/70'}`}>
                    <td className="px-4 py-3 font-medium text-text-primary">{factor}</td>
                    <td className="px-4 py-3 text-violet-300 font-semibold">{score}</td>
                    <td className="px-4 py-3 text-text-secondary">{reasoning}</td>
                  </tr>
                ))}
                <tr className="bg-emerald-600/10 border-t border-emerald-500/30">
                  <td className="px-4 py-3 font-bold text-text-primary">RICE Score</td>
                  <td className="px-4 py-3 font-bold text-emerald-400 text-base">8.6</td>
                  <td className="px-4 py-3 text-text-muted text-xs">(6 × 9 × 0.8) / 5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── PRIORITISATION SUMMARY ───────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Section 8</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Feature Proposal Prioritisation Summary</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="w-full text-sm min-w-[540px]">
            <thead>
              <tr className="bg-violet-600/20 border-b border-violet-500/30">
                {['Feature', 'RICE', 'Build Order', 'Rationale'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-violet-300 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: 'C: Neighbourhood Intelligence',
                  rice: '8.6',
                  order: 'Ship First',
                  orderColor: 'text-emerald-400',
                  rationale: 'Lowest effort, highest confidence, unique positioning',
                },
                {
                  feature: 'A: Local Guide Creator Fund',
                  rice: '9.3',
                  order: 'Ship Second',
                  orderColor: 'text-violet-400',
                  rationale: 'High impact but requires payment infrastructure',
                },
                {
                  feature: 'B: Group Trip Planner',
                  rice: '7.9',
                  order: 'Ship Third',
                  orderColor: 'text-text-muted',
                  rationale: 'Highest effort; needs real-time collaboration + AI integration',
                },
              ].map((row, i) => (
                <tr key={row.feature} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--background)]/50' : 'bg-[var(--surface)]/70'}`}>
                  <td className="px-4 py-3 font-medium text-text-primary">{row.feature}</td>
                  <td className="px-4 py-3 font-bold text-violet-300">{row.rice}</td>
                  <td className={`px-4 py-3 font-semibold ${row.orderColor}`}>{row.order}</td>
                  <td className="px-4 py-3 text-text-secondary">{row.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── RISKS ────────────────────────────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Section 9</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Risks & Open Questions</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="w-full text-sm min-w-[540px]">
            <thead>
              <tr className="bg-[var(--surface)] border-b border-[var(--border)]">
                {['Feature', 'Biggest Risk', 'Open Question'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-[#4F4D70] font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: 'A: Creator Fund',
                  risk: 'Review gaming for revenue. Monetisation thresholds (like YouTube\'s 1,000 subscribers, 4,000 watch hours) needed as quality gates. Regulatory risk — UK\'s Online Safety Act may classify paid reviews differently.',
                  question: 'How do you prevent synthetic "helpful" votes from gaming the earnings model?',
                },
                {
                  feature: 'B: Group Trip Planner',
                  risk: 'Real-time collaboration at Google Maps\' scale (2B users) is a significant infrastructure challenge.',
                  question: 'Should this launch as invitation-only beta for Local Guides Level 6+ as a smart phased rollout?',
                },
                {
                  feature: 'C: Neighbourhood Intelligence',
                  risk: 'Ethical concerns around algorithmic bias in neighbourhood scoring — a score correlating with demographic composition could perpetuate housing discrimination.',
                  question: 'How do you design fairness constraints and transparent methodology to prevent discriminatory outcomes?',
                },
              ].map((row, i) => (
                <tr key={row.feature} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--background)]/50' : 'bg-[var(--surface)]/70'}`}>
                  <td className="px-4 py-3 font-semibold text-text-primary align-top whitespace-nowrap">{row.feature}</td>
                  <td className="px-4 py-3 text-text-secondary align-top">{row.risk}</td>
                  <td className="px-4 py-3 text-text-muted align-top italic">{row.question}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── WHAT THIS TEARDOWN DEMONSTRATES ─────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Section 10</p>
        <h2 className="text-2xl font-bold text-text-primary mb-6">What This Teardown Demonstrates About My Product Thinking</h2>
        <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-8">
          I wrote this teardown not just to analyse Google Maps, but to demonstrate five product management capabilities:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              num: '1',
              title: 'Market & Data Fluency',
              body: 'Using publicly available data to quantify market position, competitive dynamics, and revenue models.',
            },
            {
              num: '2',
              title: 'Ecosystem Thinking',
              body: 'Understanding how Google Maps works not as a standalone app but as a platform with network effects, developer lock-in, and advertising feedback loops.',
            },
            {
              num: '3',
              title: 'User Empathy',
              body: 'Mapping real user journeys — from restaurant discovery to daily commutes — to identify genuine pain points rather than hypothetical ones.',
            },
            {
              num: '4',
              title: 'Feature Design with Business Context',
              body: 'Each proposal includes not just the feature concept but monetisation potential, success metrics, and RICE prioritisation.',
            },
            {
              num: '5',
              title: 'Technical Credibility',
              body: 'Architecture thinking (AI integration, data sources, platform constraints) grounded in real experience building GenBI and data products at enterprise scale.',
            },
          ].map((card) => (
            <div key={card.num} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-violet-500/30 hover:shadow-glow hover:-translate-y-[2px] transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-xs font-bold shrink-0">
                  {card.num}
                </div>
                <h4 className="text-sm font-bold text-text-primary">{card.title}</h4>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AUTHOR BIO ───────────────────────────────────────────────────── */}
      <section className="mt-20">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">About the Author</p>
            <h3 className="text-base font-bold text-text-primary mb-1">Akash Jindal</h3>
            <p className="text-sm text-text-muted mb-3">Technical Product Owner · AI Centre of Excellence · Lloyds Banking Group</p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Akash Jindal is a Technical Product Owner at Lloyds Banking Group's AI Centre of Excellence. He previously shipped AR products at Dyson and contributed to the PlayStation 5 platform launch at Sony. He holds GCP Associate Cloud Engineer, PSPO II, and ICAgile ICP-APO certifications.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://akashjindal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors border border-violet-500/30 px-3 py-1.5 rounded-lg"
              >
                Portfolio →
              </a>
              <a
                href="https://linkedin.com/in/akash--jindal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors border border-violet-500/30 px-3 py-1.5 rounded-lg"
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <div className="flex justify-between mt-20 pt-8 border-t border-[var(--border)]">
        <Link
          href="/projects"
          className="text-violet-400 hover:text-violet-300 transition-colors duration-200 text-sm"
        >
          ← Back to Projects
        </Link>
        <span />
      </div>
    </main>
  )
}
