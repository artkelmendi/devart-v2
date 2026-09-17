import { useEffect, useState } from "react";
import { BrandMark, BrandWordmark } from "./brand-mark";
import { assetUrl } from "../lib/asset-url";
import { UiArrow } from "./ui-arrow";

/** A bounded first-visit introduction, released when the opening art is ready. */
export function useArrival() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let disposed = false;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (!disposed) setReady(true); };
    let seen = false;
    try { seen = sessionStorage.getItem("devart-arrived") === "yes"; sessionStorage.setItem("devart-arrived", "yes"); } catch { /* Storage is optional. */ }
    if (preference.matches || seen || location.hash) { finish(); return; }
    const art = new Image();
    art.src = assetUrl("/assets/hero-hd.webp");
    let minimumTimer: number;
    const minimum = new Promise<void>(resolve => { minimumTimer = window.setTimeout(resolve, 1100); });
    const maximumTimer = window.setTimeout(finish, 1800);
    Promise.allSettled([art.decode(), document.fonts.ready, minimum]).then(finish);
    preference.addEventListener("change", finish);
    return () => { disposed = true; clearTimeout(minimumTimer); clearTimeout(maximumTimer); preference.removeEventListener("change", finish); };
  }, []);
  return [ready, () => setReady(true)] as const;
}

export function Arrival({ ready, skip }: { ready: boolean; skip: () => void }) {
  return <div className={`arrival${ready ? " arrival-done" : ""}`} aria-hidden={ready}>
    <div className="arrival-brand" aria-hidden="true"><BrandMark/><BrandWordmark/></div>
    <div className="arrival-rule" aria-hidden="true" />
    <p role="status">Engineering meets imagination.</p>
    <button type="button" onClick={skip} tabIndex={ready ? -1 : 0}>Skip intro <UiArrow direction="up-right"/></button>
  </div>;
}
