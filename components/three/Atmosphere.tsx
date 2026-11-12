"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ── Sky ─────────────────────────────────────────────────────── */

const SKY_VERT = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAG = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uBottom;
  uniform vec3 uRose;
  uniform vec3 uGold;
  varying vec3 vPos;

  void main() {
    vec3 d = normalize(vPos);
    float h = d.y * 0.5 + 0.5;
    vec3 col = mix(uBottom, uTop, smoothstep(0.08, 0.92, h));

    float rose = pow(max(0.0, 1.0 - length(d.xy - vec2(-0.18, -0.02)) * 1.25), 2.4);
    float gold = pow(max(0.0, 1.0 - length(d.xy - vec2(0.32, 0.20)) * 1.5), 3.0);
    float floorGlow = pow(max(0.0, -d.y), 3.0) * 0.35;

    col += uRose * rose * 0.55;
    col += uGold * gold * 0.35;
    col += uGold * floorGlow * 0.25;

    // fine dithering so the gradient never bands
    float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col += (n - 0.5) * 0.012;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function Backdrop() {
  const uniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color("#0a0617") },
      uBottom: { value: new THREE.Color("#2a0d2c") },
      uRose: { value: new THREE.Color("#ff5f9e") },
      uGold: { value: new THREE.Color("#ffbb74") },
    }),
    [],
  );

  return (
    <mesh scale={60}>
      <sphereGeometry args={[1, 48, 32]} />
      <shaderMaterial
        vertexShader={SKY_VERT}
        fragmentShader={SKY_FRAG}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ── Star dust ───────────────────────────────────────────────── */

const DUST_COUNT = 650;

export function Dust() {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(DUST_COUNT * 3);
    const speeds = new Float32Array(DUST_COUNT);

    for (let i = 0; i < DUST_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 17;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 11 - 1;
      speeds[i] = 0.25 + Math.random() * 1.1;
    }

    return { positions, speeds };
  }, []);

  useFrame((_, delta) => {
    const points = ref.current;
    if (!points) return;

    const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const step = Math.min(delta, 0.05);

    for (let i = 0; i < DUST_COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * step * 0.32;
      if (arr[i * 3 + 1] > 5.5) arr[i * 3 + 1] = -5.5;
    }

    attr.needsUpdate = true;
    points.rotation.y += step * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffd9a8"
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
