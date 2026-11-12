"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Confetti } from "./Confetti";

const SPRINKLES = ["#ff6fa5", "#b79dff", "#6fe6d0", "#ffd27a", "#ff9d7a"];
const CANDLE_COUNT = 5;
const CAKE_TOP = 1.16;

/* ── Candle flame ─────────────────────────────────────────────── */

function Flame({
  position,
  index,
  out,
}: {
  position: [number, number, number];
  index: number;
  out: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const life = useRef(1);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;

    life.current += ((out ? 0 : 1) - life.current) * Math.min(1, delta * 3);
    const t = state.clock.elapsedTime;
    const flicker =
      0.85 + Math.sin(t * 8 + index * 1.7) * 0.12 + Math.sin(t * 21 + index * 2.3) * 0.05;

    g.scale.setScalar(Math.max(0.0001, life.current * flicker));
    g.position.y = position[1] + Math.sin(t * 3 + index) * 0.006;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#ffb257" transparent opacity={0.95} />
      </mesh>
      <mesh scale={[1, 1.8, 1]} position={[0, 0.028, 0]}>
        <sphereGeometry args={[0.032, 16, 16]} />
        <meshBasicMaterial color="#fff6cf" />
      </mesh>
      <pointLight color="#ffb257" intensity={1.5} distance={1.5} decay={2} />
    </group>
  );
}

/* ── Candles ──────────────────────────────────────────────────── */

function Candles({ wished }: { wished: boolean }) {
  const spots = useMemo(
    () =>
      Array.from({ length: CANDLE_COUNT }, (_, i) => {
        const a = (i / CANDLE_COUNT) * Math.PI * 2 - Math.PI / 2;
        return [Math.cos(a) * 0.44, Math.sin(a) * 0.44] as [number, number];
      }),
    [],
  );

  return (
    <>
      {spots.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, CAKE_TOP + 0.15, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.3, 16]} />
            <meshStandardMaterial
              color={i % 2 ? "#ffd8e6" : "#f6f2ff"}
              roughness={0.35}
            />
          </mesh>
          <mesh position={[0, CAKE_TOP + 0.31, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.04, 6]} />
            <meshStandardMaterial color="#3b2a2a" />
          </mesh>
          <Flame index={i} out={wished} position={[0, CAKE_TOP + 0.35, 0]} />
        </group>
      ))}
    </>
  );
}

/* ── The cake ─────────────────────────────────────────────────── */

export function Cake({ wished }: { wished: boolean }) {
  const group = useRef<THREE.Group>(null);

  const drips = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => {
        const a = (i / 20) * Math.PI * 2;
        return {
          position: [Math.cos(a) * 1.19, 0.665, Math.sin(a) * 1.19] as [
            number,
            number,
            number,
          ],
          width: 0.062 + Math.random() * 0.03,
          length: 0.85 + Math.random() * 1.5,
        };
      }),
    [],
  );

  const topDrips = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return {
          position: [Math.cos(a) * 0.885, CAKE_TOP - 0.02, Math.sin(a) * 0.885] as [
            number,
            number,
            number,
          ],
          width: 0.05 + Math.random() * 0.022,
          length: 0.8 + Math.random() * 1.3,
        };
      }),
    [],
  );

  const sprinkles = useMemo(
    () =>
      Array.from({ length: 46 }, () => {
        const a = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 0.72;
        return {
          position: [Math.cos(a) * r, CAKE_TOP + 0.02, Math.sin(a) * r] as [
            number,
            number,
            number,
          ],
          rotation: [
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI,
          ] as [number, number, number],
          color: SPRINKLES[Math.floor(Math.random() * SPRINKLES.length)],
          size: 0.02 + Math.random() * 0.012,
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.12;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.035;
  });

  return (
    <group ref={group}>
      {/* gold plate */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[1.48, 1.36, 0.12, 72]} />
        <meshStandardMaterial color="#e9c98b" metalness={1} roughness={0.28} />
      </mesh>

      {/* bottom tier */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[1.18, 1.22, 0.56, 80]} />
        <meshStandardMaterial color="#f7e8d3" roughness={0.55} metalness={0.03} />
      </mesh>

      {/* top tier */}
      <mesh position={[0, 0.91, 0]}>
        <cylinderGeometry args={[0.86, 0.9, 0.5, 72]} />
        <meshStandardMaterial color="#fdf2e2" roughness={0.5} metalness={0.03} />
      </mesh>

      {/* gold bands */}
      <mesh position={[0, 0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.016, 12, 90]} />
        <meshStandardMaterial color="#e9c98b" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.125, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.235, 0.014, 12, 96]} />
        <meshStandardMaterial color="#e9c98b" metalness={1} roughness={0.25} />
      </mesh>

      {/* frosting drips */}
      {drips.map((d, i) => (
        <mesh
          key={`d-${i}`}
          position={d.position}
          scale={[d.width * 1.15, d.width * d.length, d.width * 1.15]}
        >
          <sphereGeometry args={[1, 14, 12]} />
          <meshStandardMaterial color="#fff6ea" roughness={0.4} />
        </mesh>
      ))}
      {topDrips.map((d, i) => (
        <mesh
          key={`td-${i}`}
          position={d.position}
          scale={[d.width * 1.15, d.width * d.length, d.width * 1.15]}
        >
          <sphereGeometry args={[1, 14, 12]} />
          <meshStandardMaterial color="#fffaf0" roughness={0.4} />
        </mesh>
      ))}

      {/* sprinkles */}
      {sprinkles.map((s, i) => (
        <mesh
          key={`s-${i}`}
          position={s.position}
          rotation={s.rotation}
          scale={[s.size, s.size, s.size * 3.4]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={s.color} roughness={0.35} />
        </mesh>
      ))}

      <Candles wished={wished} />
      <Confetti active={wished} />
    </group>
  );
}
