"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { site } from "@/data/site";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  const [wished, setWished] = useState(false);

  return (
    <header className="hero">
      <div className="hero-canvas">
        <Scene wished={wished} />
      </div>

      <div className="hero-copy">
        <div className="hero-inner">
          <p className="kicker">{site.birthdayLabel}</p>

          <h1 className="hero-title">
            <span className="title-script">{site.heroScript}</span>
            <span className="title-name">{site.herName}</span>
          </h1>

          <p className="hero-sub">{site.heroSub}</p>

          <button
            type="button"
            className={`wish-btn${wished ? " is-done" : ""}`}
            onClick={() => setWished(true)}
            disabled={wished}
          >
            <span className="wish-dot" aria-hidden />
            {wished ? "Wish sent to the stars ✦" : "Make a wish"}
          </button>
        </div>
      </div>

      <div className="hero-fade" aria-hidden />

      <div className="scroll-hint" aria-hidden>
        <span />
        <em>scroll</em>
      </div>
    </header>
  );
}
