import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function useSectionReveals(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal], .chapter-content, .about-opening, .expertise-list details");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); }
      });
    }, { threshold: .12 });
    elements.forEach(element => { element.classList.add("reveal-ready"); observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove("reveal-ready", "is-revealed")); };
  }, [enabled]);
}

/** Smooth the page itself; the existing media controller follows native scroll. */
export function usePortfolioMotion(enabled: boolean) {
  const scroll = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -90 },
      stopInertiaOnNavigate: true,
    });
    scroll.current = lenis;
    return () => {
      scroll.current = null;
      lenis.destroy();
    };
  }, [enabled]);

  return () => {
    if (scroll.current) scroll.current.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: "instant" });
  };
}

export function PrecisionCursor({ enabled }: { enabled: boolean }) {
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ring = ringRef.current;
    const pointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!enabled || !pointer.matches || !ring) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let visible = false;
    const tick = () => {
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.2
        ? requestAnimationFrame(tick) : 0;
    };
    const hide = () => {
      visible = false;
      ring.dataset.visible = "false";
      document.documentElement.style.removeProperty("--pointer-x");
      document.documentElement.style.removeProperty("--pointer-y");
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) { x = targetX; y = targetY; }
      visible = true;
      ring.dataset.visible = "true";
      ring.dataset.interactive = String(event.target instanceof Element &&
        Boolean(event.target.closest("a, button, summary, input")));
      document.documentElement.style.setProperty("--pointer-x", `${(targetX / innerWidth - 0.5) * 10}px`);
      document.documentElement.style.setProperty("--pointer-y", `${(targetY / innerHeight - 0.5) * 8}px`);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const pointerChange = () => { if (!pointer.matches) hide(); };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", hide);
    pointer.addEventListener("change", pointerChange);
    return () => {
      cancelAnimationFrame(frame);
      hide();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", hide);
      pointer.removeEventListener("change", pointerChange);
    };
  }, [enabled]);
  return <div className="precision-cursor" ref={ringRef} aria-hidden="true"><span /></div>;
}
