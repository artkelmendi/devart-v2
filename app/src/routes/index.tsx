import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { StaticJourney } from "@/components/devart-chapters";
import { PrecisionCursor, usePortfolioMotion } from "@/components/portfolio-motion";
import { Arrival, useArrival } from "@/components/arrival";
import { BrandMark, BrandWordmark } from "@/components/brand-mark";
import { ProjectShowcase, ProcessNotes } from "@/components/project-showcase";
import { useSectionReveals } from "@/components/portfolio-motion";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";
import { assetUrl } from "@/lib/asset-url";

export const Route = createFileRoute("/")({component:Index});
function Index(){
 const [arrived,skipArrival]=useArrival();
 const [reading,setReading]=useState(false);
 const [reducedMotion,setReducedMotion]=useState(false);
 const motionOff=reading || reducedMotion;
 useSectionReveals(!motionOff);
 const resetScroll=usePortfolioMotion(!motionOff);
 const [active,setActive]=useState("intro");
 const page=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
  const update=()=>setReducedMotion(preference.matches);
  update();
  preference.addEventListener("change",update);
  return()=>preference.removeEventListener("change",update);
 },[]);
 useEffect(()=>{
  const anchors=["intro","engineering","delivery","frontend","work","about"];
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
   if(visible[0])setActive(visible[0].target.id);
  },{rootMargin:"-15% 0px -45% 0px",threshold:[0,.1,.5]});
  anchors.forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el)});
  return()=>observer.disconnect();
 },[motionOff]);
 function toggleReading(){
  resetScroll();
  setReading(v=>!v);
 }
 return <div ref={page} className={`devart${motionOff?" is-reading":""}${arrived?" has-arrived":" is-arriving"}`} id="top">
  <Arrival ready={arrived || motionOff} skip={skipArrival}/>
  <PrecisionCursor enabled={!motionOff}/>
  <a className="skip-link" href="#work">Skip to work</a>
  <header className="site-header">
   <a className="wordmark brand-lockup" href="#top" aria-label="devart home"><BrandMark/><BrandWordmark/></a>
   <span className="header-note">ENGINEERING × EXPRESSION</span>
   <nav aria-label="Main navigation"><a href="#engineering" aria-current={["engineering","delivery","frontend"].includes(active)?"location":undefined}>Expertise</a><a href="#work" aria-current={active==="work"?"location":undefined}>Work</a><a href="#about" aria-current={active==="about"?"location":undefined}>About</a></nav>
   <button className="motion-switch" type="button" onClick={toggleReading} disabled={reducedMotion} aria-pressed={motionOff} aria-label={reducedMotion?"Motion off: system preference":reading?"Enable motion":"Read without motion"}><span className="switch-track" aria-hidden="true"><i/></span><span>{reducedMotion?"Motion off":reading?"Enable motion":"Read without motion"}</span></button>
  </header>
  <main>
   {motionOff?<StaticJourney/>:<ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} className="devart-world" openingImage={assetUrl("/assets/hero-hd.webp")}/>}
   <section className="selected-work" id="work">
    <div className="section-heading"><p className="section-label">SELECTED WORK</p><h2>From curiosity<br/>to something real<span>.</span></h2><p>Websites built outside the day job. A different canvas for the same attention to detail.</p></div>
    <ProjectShowcase/>
    <div className="project-ledger"><span className="ledger-number" aria-hidden="true">+</span><div><h3>More in the making.</h3><p>A space for the next website, interaction or unexpected idea.</p></div><span className="ledger-state">ONGOING EXPLORATION</span></div>
   </section>
   <ProcessNotes/>
   <section className="about-section" id="about">
    <div className="about-opening"><h2>Engineer by practice.<br/><span>Builder by nature.</span></h2><p>I'm Art. My work spans embedded systems, C and C++, delivery pipelines, testing and QA. My free time often ends up in a browser, exploring what a website can feel like.</p></div>
    <div className="expertise-list">
     {[
      ["Embedded systems","Software that meets the physical world.","C / C++",0],
      ["Delivery pipelines","Repeatable builds and connected workflows.","CI / CD",1],
      ["Testing & QA","Careful checks across the development process.","QUALITY",2],
      ["Creative frontend","Websites with personality and considered interaction.","AFTER HOURS",3]
     ].map(([title,body,tag,icon])=><details key={String(title)}><summary><img src={assetUrl("/assets/glyph-"+icon+".webp")} alt="" width="56" height="56"/><span>{title}</span><small>{tag}</small><span className="expertise-toggle" aria-hidden="true"><i/><i/></span></summary><div className="expertise-panel"><div><p>{body}</p></div></div></details>)}
    </div>
    <div className="closing-art" aria-hidden="true"><img src={assetUrl("/assets/material.webp")} alt="" loading="lazy"/><span>devart.</span></div>
   </section>
  </main>
  <footer><span>© {new Date().getFullYear()} devart. / Art.</span><p>Built with logic. Finished with curiosity.</p><a className="back-top" href="#top" aria-label="Back to top">↑</a></footer>
 </div>
}
