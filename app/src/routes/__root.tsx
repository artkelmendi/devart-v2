import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
import appMeta from "../app-meta.json";
import { scrollScrubTheme } from "../scroll-scrub-scenes";
import { assetUrl } from "../lib/asset-url";
declare const __HF_DESIGN_INSPECTOR__: boolean;
const siteUrl="https://artkelmendi.github.io/devart-v2/";
function NotFoundComponent(){return <main className="error-view"><h1>Off the path.</h1><p>This page does not exist.</p><a href="/">Back to devart</a></main>}
function ErrorComponent({error,reset}:{error:Error;reset:()=>void}){const router=useRouter();useEffect(()=>{reportHiggsfieldError(error,{boundary:"devart_root"})},[error]);return <main className="error-view"><h1>A small interruption.</h1><p>The page could not load. Please try again.</p><button onClick={()=>{void router.invalidate();reset()}}>Try again</button><a href="/">Back to devart</a></main>}
export const Route=createRootRouteWithContext<{queryClient:QueryClient}>()({
 head:()=>({meta:[
  {charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1, viewport-fit=cover"},
  {title:appMeta.og_title},{name:"description",content:appMeta.og_description},{name:"author",content:"Art Kelmendi"},
  {name:"robots",content:"index, follow, max-image-preview:large"},{name:"keywords",content:"Art Kelmendi, embedded systems engineer, C developer, C++ developer, CI/CD, testing, QA, frontend developer, devart"},
  {name:"theme-color",content:scrollScrubTheme.background},{property:"og:title",content:appMeta.og_title},
  {property:"og:description",content:appMeta.og_description},{property:"og:type",content:"website"},
  {property:"og:url",content:siteUrl},{property:"og:site_name",content:"devart."},{property:"og:locale",content:"en_US"},{property:"og:image",content:appMeta.og_image_url},{property:"og:image:alt",content:"devart. — Art Kelmendi, developer and engineer"},
  {name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:appMeta.og_title},{name:"twitter:description",content:appMeta.og_description},{name:"twitter:image",content:appMeta.og_image_url}
 ],links:[{rel:"stylesheet",href:appCss},{rel:"icon",href:assetUrl(appMeta.favicon_url),type:"image/svg+xml"},{rel:"icon",href:assetUrl("/favicon-32.png"),sizes:"32x32",type:"image/png"},{rel:"apple-touch-icon",href:assetUrl("/apple-touch-icon.png")},{rel:"manifest",href:assetUrl("/site.webmanifest")},{rel:"canonical",href:siteUrl},{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap"}]}),
 shellComponent:RootShell,component:RootComponent,notFoundComponent:NotFoundComponent,errorComponent:ErrorComponent
});
function RootShell({children}:{children:ReactNode}){return <html lang="en"><head><HeadContent/></head><body>{children}<Scripts/></body></html>}
function RootComponent(){const{queryClient}=Route.useRouteContext();useEffect(()=>{if(!__HF_DESIGN_INSPECTOR__)return;void import("../module/design-inspector/runtime").then(({installHiggsfieldDesignInspector})=>installHiggsfieldDesignInspector()).catch(error=>reportHiggsfieldError(error instanceof Error?error:new Error("Inspector unavailable"),{boundary:"inspector"}))},[]);return <QueryClientProvider client={queryClient}><Outlet/></QueryClientProvider>}
