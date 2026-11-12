import Hero from "@/components/Hero";
import { Delight } from "@/components/Delight";
import { Gallery } from "@/components/Gallery";
import { Finale, Intro, Letter, Reasons } from "@/components/Sections";

export default function Page() {
  return (
    <>
      <Delight />
      <main>
        <Hero />
        <Intro />
        <Gallery />
        <Reasons />
        <Letter />
        <Finale />
      </main>
    </>
  );
}
