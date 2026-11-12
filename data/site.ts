/**
 * ─────────────────────────────────────────────────────────────
 *  EVERYTHING YOU'LL WANT TO EDIT LIVES IN THIS FILE.
 * ─────────────────────────────────────────────────────────────
 *  1. herName / yourName  → the two names on the page.
 *  2. photos              → drop her pictures in public/photos/
 *                           and keep the file names in sync below.
 *  3. featurePhoto        → the big portrait in the intro section.
 *  4. reasons / letter    → your own words. Write badly, honestly.
 */

export type Photo = {
  src: string;
  caption: string;
  note: string;
};

export const site = {
  herName: "Shailja",
  yourName: "Hussain",

  birthdayLabel: "a little universe, just for you",
  heroScript: "Happy Birthday",
  heroSub:
    "Today the sky got dressed up, the candles are lit, and every last light on this page is here for one reason — you.",

  featurePhoto: {
    src: "/photos/01.jpg",
    caption: "the face I'd know anywhere",
    note: "my favourite frame",
  } satisfies Photo,

  photos: [
    { src: "/photos/03.jpg", caption: "the laugh I do it all for", note: "certified troublemaker" },
    { src: "/photos/06.jpg", caption: "sunlit corridor, better company", note: "golden hour" },
    { src: "/photos/10.jpg", caption: "festive and effortless", note: "you in your element" },
    { src: "/photos/07.jpg", caption: "you in yellow", note: "a whole mood" },
    { src: "/photos/02.jpg", caption: "caught you looking back", note: "still my favourite angle" },
    { src: "/photos/09.jpg", caption: "night walks and long talks", note: "no filter needed" },
    { src: "/photos/04.jpg", caption: "quiet confidence", note: "warm light, warmer company" },
    { src: "/photos/08.jpg", caption: "where it all started", note: "tiny you, same eyes" },
    { src: "/photos/05.jpg", caption: "a little blurry, entirely you", note: "unfaded anyway" },
  ] as Photo[],

  intro: {
    kicker: "before anything else",
    heading: "You have this quiet way of making ordinary days feel worth remembering.",
    paragraphs: [
      "I built this little corner of the internet because a text message felt too small. There are four hundred ways to say happy birthday, and none of them quite hold everything I wanted to say.",
      "So here's a cake that never melts, balloons that never fall, and a sky full of light that keeps glowing for as long as this page stays open. Which, knowing me, is going to be a very long time.",
    ],
  },

  reasons: {
    kicker: "a short, incomplete list",
    heading: "Things I hope you know about yourself",
    items: [
      {
        title: "Your laugh",
        text: "It arrives before you do and stays a while after you leave. Half the jokes I tell exist purely to hear it again.",
      },
      {
        title: "The way you listen",
        text: "Like whatever I'm saying actually matters. People never forget how you made them feel — and somehow you make everyone feel seen.",
      },
      {
        title: "Your impossible courage",
        text: "You keep going, keep growing, keep turning hard days into stories worth telling. I don't think you realise how rare that is.",
      },
      {
        title: "Your objectively terrible jokes",
        text: "Unreasonably funny. Deeply unserious. I would not trade a single one of them for anything.",
      },
    ],
  },

  letter: {
    kicker: "one more thing",
    greeting: "Dear",
    paragraphs: [
      "I hope this year is gentle with you. I hope it gives you slow mornings, good coffee, and the kind of news that makes you put your phone down and smile at absolutely nothing.",
      "I hope you get to be proud of yourself out loud. I hope you take up more space, ask for more, apologise for less, and let yourself be loved on the days you feel least like it.",
      "And I hope you know that on every ordinary Tuesday — not just today — there is someone in your corner, cheering louder than anyone else in the room.",
    ],
    closing: "with all my love,",
  },

  finale: {
    line: "Here's to a year that treats you as well as you treat everyone else.",
    signature: "Happy birthday, always.",
  },

  footer: "made with three.js, far too much love, and zero sleep.",
} as const;
