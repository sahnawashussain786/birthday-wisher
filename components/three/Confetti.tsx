"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COLORS = ["#ff6fa5", "#e9c98b", "#b79dff", "#6fe6d0", "#ff9d7a", "#fff3c4"];
const COUNT = 220;

/**
 * A one-shot confetti burst from the candles.
 * Hidden until `active` flips true, then it fires, falls and fades.
 */
export function Confetti({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const timeline = useRef({ time: 0, fired: false });

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const color = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = 1.28 + Math.random() * 0.1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

      const angle = Math.random() * Math.PI * 2;
      const outward = 0.9 + Math.random() * 2.2;

      velocities[i * 3] = Math.cos(angle) * outward;
      velocities[i * 3 + 1] = 1.6 + Math.random() * 2.4;
      velocities[i * 3 + 2] = Math.sin(angle) * outward;

      color.set(COLORS[i % COLORS.length]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, velocities, colors };
  }, []);

  useFrame((_, delta) => {
    const points = ref.current;
    if (!points) return;

    if (!active) {
      points.visible = false;
      return;
    }

    points.visible = true;
    const step = Math.min(delta, 0.05);
    timeline.current.fired = true;
    timeline.current.time += step;

    const drag = Math.pow(0.22, step);
    const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      velocities[i * 3] *= drag;
      velocities[i * 3 + 2] *= drag;
      velocities[i * 3 + 1] -= 3.4 * step;
      velocities[i * 3 + 1] *= drag;

      arr[i * 3] += velocities[i * 3] * step;
      arr[i * 3 + 1] += velocities[i * 3 + 1] * step;
      arr[i * 3 + 2] += velocities[i * 3 + 2] * step;
    }

    attr.needsUpdate = true;

    const material = points.material as THREE.PointsMaterial;
    const t = timeline.current.time;
    material.opacity = Math.max(0, 1 - Math.max(0, t - 2.4) / 1.8);
    points.rotation.y += step * 0.5;

    if (t > 4.4) points.visible = false;
  });

  return (
    <points ref={ref} visible={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.085}
        sizeAttenuation
        transparent
        depthWrite={false}
      />
    </points>
  );
}
