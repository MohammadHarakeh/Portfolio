/**
 * Subtle isometric “full-stack” motif: layered surfaces read as UI → API → data.
 * Decorative only (aria-hidden). Paired with styles in `app/globals.css`.
 */
export function DevStackBackdrop() {
  return (
    <div
      className="dev-stack-backdrop pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {/* Layout grid — line weight / colors in `globals.css` ([data-dev-grid]) */}
      <div data-dev-grid aria-hidden />

      {/* Code braces — developer identity */}
      <span className="dev-stack-brace dev-stack-brace--left absolute left-[6%] top-[22%] hidden font-mono text-[clamp(3rem,12vw,7rem)] font-light leading-none md:block">
        {"{"}
      </span>
      <span className="dev-stack-brace dev-stack-brace--right absolute right-[6%] top-[22%] hidden font-mono text-[clamp(3rem,12vw,7rem)] font-light leading-none md:block">
        {"}"}
      </span>

      <div className="dev-stack-perspective">
        <div className="dev-stack-rotator">
          <div className="dev-stack-layer dev-stack-layer--data" />
          <div className="dev-stack-layer dev-stack-layer--api" />
          <div className="dev-stack-layer dev-stack-layer--ui" />
        </div>
      </div>
    </div>
  )
}
