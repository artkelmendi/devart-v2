type ArrowDirection = "up" | "down" | "up-right";

export function UiArrow({ direction, className = "" }: { direction: ArrowDirection; className?: string }) {
  const path = direction === "up-right"
    ? "M4 12 12 4M6 4h6v6"
    : direction === "down"
      ? "M8 3v10M4.5 9.5 8 13l3.5-3.5"
      : "M8 13V3M4.5 6.5 8 3l3.5 3.5";

  return <svg className={`ui-arrow ${className}`.trim()} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d={path}/>
  </svg>;
}
