"use client";

import { useRef } from "react";
import { site, type Photo as PhotoType } from "@/data/site";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

function Polaroid({ photo, index }: { photo: PhotoType; index: number }) {
  const inner = useRef<HTMLDivElement>(null);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = inner.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--ry", `${px * 13}deg`);
    el.style.setProperty("--rx", `${-py * 13}deg`);
  };

  const onLeave = () => {
    const el = inner.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <figure
      className="polaroid"
      style={{ "--r": `${((index % 3) - 1) * 2.1}deg` } as React.CSSProperties}
    >
      <div
        className="polaroid-inner"
        ref={inner}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="frame">
          <Photo src={photo.src} alt={photo.caption} index={index} />
        </div>
        <figcaption>
          <span className="cap">{photo.caption}</span>
          <span className="date">{photo.note}</span>
        </figcaption>
      </div>
    </figure>
  );
}

export function Gallery() {
  return (
    <section className="section gallery" id="photos">
      <div className="wrap">
        <Reveal>
          <p className="kicker">evidence of a life well lived</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="h2">
            A few of my <em>favourite</em> frames
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="lead">
            Scrolling through these is my favourite kind of time travel. Hover
            one — they still can&apos;t sit still, just like you.
          </p>
        </Reveal>

        <div className="gallery-grid">
          {site.photos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 70}>
              <Polaroid photo={photo} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
