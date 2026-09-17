import { HeroDetails } from "./project-showcase";
import { BrandWordmark } from "./brand-mark";
import { assetUrl } from "../lib/asset-url";
import { UiArrow } from "./ui-arrow";
export function JourneyChapters({ illustrated = false }: { illustrated?: boolean }) {
  return <div className="journey-chapters">
    {!illustrated && <div className="hero-action-row"><HeroDetails/></div>}
    <section className="chapter chapter-metal" id="engineering">
      <div className="chapter-content"><h2>Close to<br/>the metal.</h2><p>I work where software meets hardware. Embedded systems, C and C++, with attention to the details that make things dependable.</p><div className="skill-strip"><span>C</span><span>C++</span><span>Embedded systems</span></div></div>
      {illustrated && <figure className="chapter-still"><img src={assetUrl("/assets/engineering-still.webp")} alt="Detailed rose copper circuit traces surrounding a precision silver processor" loading="lazy" width="2048" height="1536"/><figcaption>Small details. Solid foundations.</figcaption></figure>}
    </section>
    <section className="chapter chapter-confidence" id="delivery">
      <div className="chapter-content"><h2>Confidence,<br/>built in.</h2><p>A good build is repeatable. I work with CI/CD pipelines, testing and QA to turn changes into software you can trust.</p><div className="delivery-line"><span>Build</span><i/><span>Test</span><i/><span>Deliver</span></div></div>
      {illustrated && <figure className="chapter-still"><img src={assetUrl("/assets/material.webp")} alt="An ordered assembly of graphite circuits and silver components" loading="lazy" width="1600" height="1062"/><figcaption>Every layer has a purpose.</figcaption></figure>}
    </section>
    <section className="chapter chapter-play" id="frontend">
      <div className="chapter-content"><h2>Serious engineering.<br/><em>Room to play.</em></h2><p>In my free time, I explore the other side of software: expressive websites, thoughtful interactions and the little details you feel.</p><a className="chapter-work" href="#work">View work <UiArrow direction="down"/></a></div>
      {illustrated && <figure className="chapter-still"><img src={assetUrl("/assets/frontend-still.webp")} alt="Smoked glass interface-like panels connected by a sculptural copper ribbon" loading="lazy" width="2048" height="1536"/><figcaption>Structure, with a little imagination.</figcaption></figure>}
    </section>
  </div>;
}
export function StaticJourney() {
  return <section className="static-journey">
    <div className="static-hero" id="intro">
      <img className="static-hero-image" src={assetUrl("/assets/hero-hd.webp")} alt="" fetchPriority="high" width="3840" height="2160"/>
      <div className="static-hero-copy"><p className="intro-label">DEVELOPER & ENGINEER</p><h1><BrandWordmark/></h1><p>Engineering the foundations.<br/>Exploring the possibilities.</p><HeroDetails/></div>
    </div>
    <JourneyChapters illustrated/>
  </section>;
}
