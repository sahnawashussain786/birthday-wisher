"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/** Glow on the candles + a soft cinematic vignette. */
export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        mipmapBlur
        intensity={1.05}
        luminanceThreshold={0.45}
        luminanceSmoothing={0.35}
        radius={0.7}
      />
      <Vignette offset={0.3} darkness={0.72} />
    </EffectComposer>
  );
}
