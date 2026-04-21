/**
 * Subtle isometric “full-stack” motif: layered surfaces read as UI → API → data.
 * Decorative only (aria-hidden). Paired with styles in `app/globals.css`.
 */
export function DevStackBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Faint layout grid — structure / front-end craft */}
      <div
        className="absolute inset-0 opacity-[0.045] dark:opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgb(148 163 184) 1px, transparent 1px),
            linear-gradient(rgb(148 163 184) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Code braces — developer identity */}
      <span className="absolute left-[6%] top-[22%] hidden font-mono text-[clamp(3rem,12vw,7rem)] font-light leading-none text-slate-500/15 dark:text-slate-400/20 md:block">
        {"{"}
      </span>
      <span className="absolute right-[6%] top-[22%] hidden font-mono text-[clamp(3rem,12vw,7rem)] font-light leading-none text-slate-500/15 dark:text-slate-400/20 md:block">
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
