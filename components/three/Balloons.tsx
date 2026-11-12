"use client";

import { Float } from "@react-three/drei";

type Balloon = {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
};

const BALLOONS: Balloon[] = [
  { position: [-2.95, 1.45, -1.6], color: "#ff6fa5", scale: 1, speed: 1.3 },
  { position: [3.45, 1.95, -2.2], color: "#e9c98b", scale: 0.85, speed: 1.65 },
  { position: [-2.25, 3.15, -3.4], color: "#b79dff", scale: 0.72, speed: 1.1 },
  { position: [2.7, 3.4, -3.9], color: "#6fe6d0", scale: 0.62, speed: 1.85 },
  { position: [1.15, 2.25, -1.15], color: "#ff9d7a", scale: 0.55, speed: 1.45 },
];

function OneBalloon({ balloon }: { balloon: Balloon }) {
  const { position, color, scale, speed } = balloon;

  return (
    <Float speed={speed} rotationIntensity={0.35} floatIntensity={0.85}>
      <group position={position} scale={scale}>
        {/* body */}
        <mesh scale={[1, 1.18, 1]}>
          <sphereGeometry args={[0.36, 32, 32]} />
          <meshPhysicalMaterial
            color={color}
            roughness={0.2}
            metalness={0.06}
            clearcoat={1}
            clearcoatRoughness={0.18}
          />
        </mesh>

        {/* knot */}
        <mesh position={[0, -0.44, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.07, 0.1, 16]} />
          <meshStandardMaterial color={color} roughness={0.45} />
        </mesh>

        {/* string */}
        <mesh position={[0, -0.98, 0]}>
          <cylinderGeometry args={[0.0035, 0.0035, 1, 6]} />
          <meshStandardMaterial
            color="#f3e8ff"
            roughness={0.6}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function Balloons({ wide }: { wide: boolean }) {
  return (
    <group scale={wide ? 1 : 0.78} position={wide ? [0, 0, 0] : [0, 0.55, 0]}>
      {BALLOONS.map((balloon, i) => (
        <OneBalloon key={i} balloon={balloon} />
      ))}
    </group>
  );
}
