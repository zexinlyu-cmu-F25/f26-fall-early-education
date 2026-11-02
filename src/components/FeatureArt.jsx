// Little scenes for the feature cards. Each draws in a 400×220 box with the site's ink outline style.

const INK = '#3E322A'
const PANTS = '#5A4A3E'

function Scene({ children, label }) {
  return (
    <svg viewBox="0 0 400 220" className="h-auto w-full" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label}>
      {children}
    </svg>
  )
}

function Label({ x, y, children, size = 13, anchor = 'start', weight = 700, fill = INK, hand }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={hand ? size + 5 : size}
      fontWeight={hand ? 400 : weight}
      fontFamily={hand ? 'Caveat, cursive' : 'Nunito, sans-serif'}
      textAnchor={anchor}
      fill={fill}
      stroke="none"
    >
      {children}
    </text>
  )
}

// a simple person standing with feet at (x, y)
function Person({ x, y, s = 1, shirt, skin = '#F3D2B5', hair = INK, bun, badge, children }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-11" y="-24" width="9" height="24" rx="3" fill={PANTS} />
      <rect x="2" y="-24" width="9" height="24" rx="3" fill={PANTS} />
      <path d="M-16 -20 Q-17 -48 0 -48 Q17 -48 16 -20 Z" fill={shirt} />
      {badge && <rect x="3" y="-38" width="8" height="10" rx="2" fill="#FFFBF4" strokeWidth="2" />}
      {bun && <circle cx="0" cy="-79" r="6" fill={hair} />}
      <circle cx="0" cy="-62" r="14" fill={skin} />
      <path d="M-14 -62 A14 14 0 0 1 14 -62 Q0 -70 -14 -62 Z" fill={hair} />
      <circle cx="-5" cy="-61" r="1.6" fill={INK} stroke="none" />
      <circle cx="5" cy="-61" r="1.6" fill={INK} stroke="none" />
      <path d="M-4 -56 Q0 -53 4 -56" strokeWidth="2" />
      {children}
    </g>
  )
}

function Face({ x, y, r = 10, skin = '#F3D2B5', hair = INK }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={skin} strokeWidth="2.5" />
      <path d={`M${x - r} ${y} A${r} ${r} 0 0 1 ${x + r} ${y} Q${x} ${y - r * 0.55} ${x - r} ${y} Z`} fill={hair} strokeWidth="2.5" />
    </g>
  )
}

function Check({ x, y, r = 11 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#5F7F68" strokeWidth="2.5" />
      <path d={`M${x - r * 0.45} ${y} l${r * 0.3} ${r * 0.32} l${r * 0.55} ${-r * 0.6}`} stroke="#FFFBF4" strokeWidth="2.5" />
    </g>
  )
}

export function MapArt() {
  const rooms = [
    { x: 30, label: 'Library', kids: [[70, 95, '#F3D2B5', '#C9853E'], [100, 120, '#8D5A3B', INK]] },
    { x: 145, label: 'Gym', kids: [[185, 90, '#D9A27E', INK], [222, 118, '#F6D7C3', '#E3B15B']] },
    { x: 260, label: 'Art room', kids: [[300, 100, '#F3D2B5', '#8A5A3C']] },
  ]
  return (
    <Scene label="A school map showing which room each child is in">
      <rect x="20" y="30" width="360" height="170" rx="16" fill="#FFFBF4" />
      {rooms.map((r) => (
        <g key={r.label}>
          <rect x={r.x} y="44" width="110" height="110" rx="10" fill="#F3EBDD" strokeWidth="2.5" />
          <Label x={r.x + 10} y="64" size={12}>{r.label}</Label>
          {r.kids.map(([x, y, skin, hair]) => <Face key={x} x={x} y={y} skin={skin} hair={hair} />)}
        </g>
      ))}
      <path d="M30 178 H370" strokeDasharray="2 10" strokeOpacity="0.4" />
      <Label x="200" y="190" size={11} anchor="middle" fill="#6B5A4C">hallway</Label>
      {/* pin over Maya in the gym */}
      <path d="M222 92 s-16 -14 -16 -27 a16 16 0 0 1 32 0 c0 13 -16 27 -16 27 z" fill="#DE7462" />
      <circle cx="222" cy="65" r="6" fill="#FFFBF4" />
      <rect x="244" y="8" width="98" height="28" rx="14" fill="#F6C35A" strokeWidth="2.5" />
      <Label x="293" y="27" anchor="middle" size={12}>Maya · Gym</Label>
    </Scene>
  )
}

export function LineupArt() {
  const kids = [
    { x: 175, shirt: '#F79A8B', skin: '#8D5A3B', hair: '#2B1D17' },
    { x: 245, shirt: '#A9C4C2', skin: '#F3D2B5', hair: '#C9853E' },
    { x: 315, shirt: '#5F7F68', skin: '#D9A27E', hair: INK },
  ]
  return (
    <Scene label="Children lined up in the order their parents arrive">
      <path d="M20 196 H380" />
      {kids.map((k, i) => (
        <g key={k.x}>
          <Person x={k.x} y={194} shirt={k.shirt} skin={k.skin} hair={k.hair} />
          <circle cx={k.x} cy="96" r="13" fill="#FFFBF4" strokeWidth="2.5" />
          <Label x={k.x} y="101" anchor="middle" size={14}>{i + 1}</Label>
        </g>
      ))}
      <Person x={70} y={194} s={1.35} shirt="#F6C35A" skin="#8D5A3B" hair="#2B1D17" />
      <path d="M112 150 H140 M132 142 l8 8 l-8 8" />
      <Label x="70" y="44" anchor="middle" hand size={16}>arrived 1st</Label>
    </Scene>
  )
}

export function TapArt() {
  return (
    <Scene label="A parent tapping a phone on the NFC reader at the school gate">
      <path d="M20 196 H380" />
      {/* fence */}
      {[300, 322, 344, 366].map((x) => <path key={x} d={`M${x} 196 V96 l8 -10 l8 10`} fill="#FFFBF4" />)}
      <path d="M296 120 H378 M296 170 H378" />
      {/* reader post */}
      <rect x="232" y="104" width="16" height="92" fill="#8A5A3C" />
      <rect x="212" y="58" width="56" height="54" rx="10" fill="#F6C35A" />
      <path d="M232 76 a10 10 0 0 1 0 18 M240 70 a18 18 0 0 1 0 30" strokeWidth="2.5" />
      {/* parent with phone */}
      <Person x={110} y={194} s={1.4} shirt="#A9C4C2" skin="#D9A27E">
        <path d="M14 -44 Q40 -56 48 -72" strokeWidth="2.2" />
      </Person>
      <rect x="168" y="66" width="18" height="30" rx="4" fill="#FFFBF4" transform="rotate(18 177 81)" />
      <path d="M192 70 a10 10 0 0 1 0 14 M198 64 a18 18 0 0 1 0 26" stroke="#DE7462" />
      <rect x="136" y="16" width="160" height="30" rx="15" fill="#FFFBF4" strokeWidth="2.5" />
      <Check x={154} y={31} r={9} />
      <Label x="170" y="36" size={12}>Daniel Lee · verified</Label>
    </Scene>
  )
}

export function NotifyArt() {
  return (
    <Scene label="A teacher receiving a quiet notification that a parent has arrived">
      <path d="M20 196 H380" />
      <Person x={80} y={194} s={1.4} shirt="#5F7F68" skin="#F3D2B5" hair="#2E2320" bun badge />
      {/* phone with notification */}
      <rect x="160" y="20" width="200" height="168" rx="20" fill="#FFFBF4" />
      <path d="M240 34 H280" strokeWidth="4" strokeOpacity="0.3" />
      <rect x="174" y="52" width="172" height="58" rx="12" fill="#D3E0D5" strokeWidth="2.5" />
      <path d="M186 90 V78 a8 8 0 0 1 16 0 v12 l3 4 h-22 z" fill="#F6C35A" strokeWidth="2" />
      <path d="M191 98 a3 3 0 0 0 6 0" strokeWidth="2" />
      <Label x="214" y="76" size={12}>Maya’s dad is here</Label>
      <Label x="214" y="96" size={11} weight={600} fill="#6B5A4C">Lineup spot #1 · Gate A</Label>
      <rect x="174" y="122" width="172" height="40" rx="12" fill="#F3EBDD" strokeWidth="2.5" />
      <Label x="188" y="147" size={11} weight={600} fill="#6B5A4C">Leo: going to Art Club today</Label>
      <Label x="120" y="44" anchor="middle" hand size={16}>ding!</Label>
    </Scene>
  )
}

export function JobsArt() {
  const staff = [
    { x: 90, job: 'Gate', shirt: '#F79A8B', skin: '#8D5A3B', hair: '#2B1D17' },
    { x: 200, job: 'Lineup', shirt: '#F6C35A', skin: '#F3D2B5', hair: '#C9853E', bun: true },
    { x: 310, job: 'Escort', shirt: '#A9C4C2', skin: '#D9A27E', hair: INK },
  ]
  return (
    <Scene label="Staff members each assigned to a pickup job: gate, lineup and escort">
      <path d="M20 196 H380" />
      {staff.map((p) => (
        <g key={p.job}>
          <Person x={p.x} y={194} s={1.3} shirt={p.shirt} skin={p.skin} hair={p.hair} bun={p.bun} badge />
          <rect x={p.x - 40} y="36" width="80" height="30" rx="15" fill="#FFFBF4" strokeWidth="2.5" />
          <Label x={p.x} y="56" anchor="middle" size={13}>{p.job}</Label>
          <path d={`M${p.x} 66 V78`} strokeWidth="2.5" strokeDasharray="2 5" />
        </g>
      ))}
    </Scene>
  )
}

export function RecordArt() {
  const rows = [
    ['3:14 PM', 'Maya', 'Daniel Lee (dad)'],
    ['3:16 PM', 'Leo', 'Ruth Kim (grandma)'],
    ['3:19 PM', 'Ava', 'Sam Ortiz (dad)'],
  ]
  return (
    <Scene label="A pickup log listing the time, child and verified adult for each handoff">
      <rect x="40" y="26" width="320" height="180" rx="14" fill="#FFFBF4" />
      <rect x="160" y="14" width="80" height="24" rx="8" fill="#8A5A3C" />
      <Label x="60" y="66" size={11} fill="#6B5A4C">TIME</Label>
      <Label x="130" y="66" size={11} fill="#6B5A4C">CHILD</Label>
      <Label x="190" y="66" size={11} fill="#6B5A4C">PICKED UP BY</Label>
      {rows.map(([t, child, adult], i) => {
        const y = 98 + i * 36
        return (
          <g key={t}>
            <path d={`M56 ${y - 24} H344`} strokeWidth="1.5" strokeOpacity="0.25" />
            <Label x="60" y={y} size={12} weight={600}>{t}</Label>
            <Label x="130" y={y} size={12}>{child}</Label>
            <Label x="190" y={y} size={12} weight={600}>{adult}</Label>
            <Check x={330} y={y - 5} r={9} />
          </g>
        )
      })}
    </Scene>
  )
}
