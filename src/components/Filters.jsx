// Shared SVG filters: a "boiling" hand-drawn wobble for characters and a static rough edge for scenery.
export default function Filters() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <filter id="wobble">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1">
          <animate attributeName="seed" values="1;2;3;4" dur="0.8s" calcMode="discrete" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale="2.2" />
      </filter>
      <filter id="rough">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" />
        <feDisplacementMap in="SourceGraphic" scale="3" />
      </filter>
    </svg>
  )
}
