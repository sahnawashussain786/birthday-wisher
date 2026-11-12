import { site } from "@/data/site";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

/* ── Intro ────────────────────────────────────────────────────── */

export function Intro() {
  return (
    <section className="section intro" id="intro">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{site.intro.kicker}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="h2">{site.intro.heading}</h2>
        </Reveal>

        <div className="intro-cols">
          <div className="body-copy">
            {site.intro.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={120 + i * 80}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={300}>
              <p className="intro-signoff">
                Happy birthday, <strong>{site.herName}</strong>. Thank you for
                being exactly who you are.
              </p>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <figure className="feature">
              <div className="feature-frame">
                <Photo
                  src={site.featurePhoto.src}
                  alt={site.featurePhoto.caption}
                  index={1}
                />
              </div>
              <figcaption>
                <span className="cap">{site.featurePhoto.caption}</span>
                <span className="date">{site.featurePhoto.note}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Reasons ──────────────────────────────────────────────────── */

export function Reasons() {
  return (
    <section className="section reasons-section" id="reasons">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{site.reasons.kicker}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="h2">
            Things I hope you know <em>about yourself</em>
          </h2>
        </Reveal>

        <ol className="reasons">
          {site.reasons.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 90} className="reason">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Letter ───────────────────────────────────────────────────── */

export function Letter() {
  return (
    <section className="section letter-section" id="letter">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{site.letter.kicker}</p>
        </Reveal>

        <Reveal delay={100}>
          <article className="letter">
            <span className="letter-mark" aria-hidden>
              ✦
            </span>
            <p className="greeting">
              {site.letter.greeting} {site.herName},
            </p>
            {site.letter.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p className="signature">{site.yourName}</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Finale ───────────────────────────────────────────────────── */

export function Finale() {
  const group = (
    <div className="marquee-group">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i}>
          {i % 2 === 0 ? "happy birthday" : "✦"}
          {i % 2 === 0 ? <em>{site.herName}</em> : null}
        </span>
      ))}
    </div>
  );

  return (
    <section className="finale" id="finale">
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {group}
          {group}
        </div>
      </div>

      <div className="wrap finale-inner">
        <Reveal>
          <p className="big-love">{site.finale.signature}</p>
        </Reveal>
        <Reveal delay={120}>
          <p className="lead">{site.finale.line}</p>
        </Reveal>
        <Reveal delay={220}>
          <p className="finale-sign">{site.yourName}</p>
        </Reveal>
      </div>

    </section>
  );
}
