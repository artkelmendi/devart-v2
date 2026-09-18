import { createElement } from "react";
import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";
import { JourneyChapters } from "@/components/devart-chapters";
import { BrandWordmark } from "@/components/brand-mark";
import { assetUrl } from "@/lib/asset-url";
export const scrollScrubTheme: ScrollScrubTheme = {accent:"#C88E9C",background:"#17191C",ink:"#F1F1EE",muted:"#ACAEB2"};
export const scrollScrubScenes: ScrollScrubScene[] = [{
 id:"intro",label:"devart.",clip:assetUrl("/assets/world/scene-01-4k.mp4"),
 poster:assetUrl("/assets/world/scene-01-4k-poster.webp"),
 mobileClip:assetUrl("/assets/world/scene-01-mobile-hd.mp4"),
 mobilePoster:assetUrl("/assets/world/scene-01-mobile-hd-poster.webp"),
 title:createElement(BrandWordmark),body:"Engineering the foundations. Exploring the possibilities.",
 kicker:"Developer & engineer",scroll:4.6,linger:0,
 objectPosition:"50% 50%",mobileObjectPosition:"50% 44%",
 actions:createElement(JourneyChapters)
}];
