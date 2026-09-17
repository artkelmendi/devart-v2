import { assetUrl } from "../lib/asset-url";

/** Exact geometry supplied in Devart-Brand-Package. */
export function BrandMark() {
  return <svg className="brand-symbol" viewBox="269 221 720 594" aria-hidden="true" focusable="false">
    <path className="brand-piece brand-center" pathLength="1" d="M505 408 L601 248 C612 229 641 229 653 248 L749 408 L627 670 Z"/>
    <path className="brand-piece brand-left" pathLength="1" d="M482 450 L537 584 L430 774 C420 791 402 802 381 802 L304 802 C285 802 275 788 285 771 Z"/>
    <path className="brand-piece brand-right" pathLength="1" d="M773 450 L973 771 C983 788 975 802 955 802 L874 802 C853 802 835 791 825 774 L717 584 Z"/>
  </svg>;
}
export function BrandWordmark() {
  return <img className="brand-wordmark" src={assetUrl("/assets/devart-wordmark.svg")} alt="devart." width="854" height="236" fetchPriority="high"/>;
}
