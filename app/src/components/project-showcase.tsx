import { BrandMark } from "./brand-mark";
import { assetUrl } from "../lib/asset-url";
import { UiArrow } from "./ui-arrow";
const projects = [
  { name: "Great Prosperity", category: "01 / HOSPITALITY", description: "Hotel supplies, thoughtfully presented.", image: "project-great-prosperity.webp", url: "https://gphotelsupplies.com", alt: "Great Prosperity website homepage with a bright hotel suite" },
  { name: "Curri Architect", category: "02 / ARCHITECTURE", description: "Space, proportion and a considered digital presence.", image: "project-curri-architect.webp", url: "https://artkelmendi.github.io/curri-architect/", alt: "Curri Architect website homepage with bold architectural typography" },
  { name: "Aure Berries", category: "03 / AGRICULTURE · ENGLISH", description: "A story rooted in the blueberry fields of Peja.", image: "project-blueberries.webp", url: "https://artkelmendi.github.io/blueberries/?lang=en", alt: "Aure Berries website homepage in deep purple" },
  { name: "Eco Clean", category: "04 / TEXTILE CARE", description: "A fresh perspective on industrial laundry.", image: "project-ecoclean.webp", url: "https://artkelmendi.github.io/ecoclean-v2/", alt: "Eco Clean website homepage inside an industrial washing drum" },
];

export function ProjectShowcase() {
  return <div className="project-grid">{projects.map(project => <a data-reveal="project" className="project-feature" href={project.url} key={project.name} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name}${project.name === "Aure Berries" ? " in English" : ""}, opens in a new tab`}>
    <div className="project-image"><img src={assetUrl(`/assets/${project.image}`)} alt={project.alt} loading="lazy" width="1200" height="800"/><span className="project-category">{project.category}</span><span className="project-open" aria-hidden="true"><UiArrow direction="up-right"/></span></div>
    <div className="project-description"><div><h3>{project.name}</h3><p>{project.description}</p></div><span className="project-domain">Explore <UiArrow direction="up-right"/></span></div>
  </a>)}</div>;
}

export function HeroDetails() {
  return <div className="hero-details">
    <div className="hero-discipline"><span className="signal-dot"/>ART KELMENDI <span>/</span> CODE WITH CHARACTER</div>
    <div className="hero-specialties"><span>C / C++</span><span>Embedded systems</span><span>Creative frontend</span></div>
    <div className="hero-explore"><a className="work-target" href="#work"><span>Explore 04 websites</span><UiArrow direction="up-right"/></a><span className="scroll-instruction"><UiArrow direction="down"/> Scroll to explore</span></div>
    <div className="hero-brand-emblem" aria-hidden="true"><BrandMark/></div>
  </div>;
}

export function ProcessNotes() {
  return <section className="process-notes" aria-labelledby="process-title"><p className="section-label">HOW I THINK</p><h2 id="process-title" data-reveal="type">From the smallest detail<br/>to the whole experience.</h2><div className="process-grid">{[
    ["01", "Understand the system", "Start with the constraints. What needs to happen, where can it fail, and what does the person using it actually need?"],
    ["02", "Make it dependable", "Think beyond the happy path. Clear code, repeatable delivery and thoughtful testing are part of the experience."],
    ["03", "Leave room for delight", "Bring the same care to the surface: typography, motion and interactions that make a website feel considered."],
  ].map(([number,title,body])=><article key={number} data-reveal="process"><span className="process-number">{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>;
}
