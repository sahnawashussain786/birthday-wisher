"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient page furniture: a soft light that follows the cursor,
 * a hairline scroll-progress bar, and a whisper of film grain.
 */
export function Delight() {
  const glow = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.32 };
    const pos = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.075;
      pos.y += (target.y - pos.y) * 0.075;
      if (glow.current) {
        glow.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) {
        bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="progress" ref={bar} aria-hidden />
      <div className="cursor-glow" ref={glow} aria-hidden />
      <div className="grain" aria-hidden />
    </>
  );
}
