"use client";

import { useState } from "react";

/**
 * Renders a local photo from /public/photos.
 * If the file isn't there yet, it shows a pretty placeholder
 * telling you exactly which path to drop her picture at.
 */
export function Photo({
  src,
  alt,
  index = 0,
}: {
  src: string;
  alt: string;
  index?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`photo-fallback tone-${index % 4}`}>
        <span className="pf-mark" aria-hidden>
          ✦
        </span>
        <span className="pf-note">
          drop her photo at
          <br />
          <code>public{src}</code>
        </span>
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
