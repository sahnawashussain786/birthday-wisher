"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Backdrop, Dust } from "./three/Atmosphere";
import { Balloons } from "./three/Balloons";
import { Cake } from "./three/Cake";
import { Effects } from "./three/Effects";

/** Gentle mouse-parallax camera, eased every frame. */
function CameraRig({ wide }: { wide: boolean }) {
  const { camera, pointer } = useThree();
  const look = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const k = 1 - Math.pow(0.0025, delta);
    const wantX = pointer.x * 0.9;
    const wantY = 1.35 + pointer.y * 0.55;

    camera.position.x += (wantX - camera.position.x) * k;
    camera.position.y += (wantY - camera.position.y) * k;

    look.current.set(wide ? 0.55 : 0, wide ? 0.42 : 0.12, 0);
    camera.lookAt(look.current);
  });

  return null;
}

function World({ wished }: { wished: boolean }) {
  const { viewport } = useThree();
  const wide = viewport.width > 7.5;

  return (
    <>
      <Backdrop />
      <CameraRig wide={wide} />

      <ambientLight intensity={0.7} color="#b9a7ff" />
      <hemisphereLight args={["#ffd7c2", "#2a0f2b", 0.55]} />
      <directionalLight position={[2.5, 5, 3.5]} intensity={2.4} color="#fff0dc" />
      <pointLight position={[-2.6, 1.2, 2.6]} intensity={18} color="#ff6fa5" distance={16} decay={2} />
      <pointLight position={[3.2, 0.7, 1.6]} intensity={14} color="#8f6bff" distance={16} decay={2} />
      <spotLight
        position={[0, 6, 2]}
        angle={0.7}
        penumbra={1}
        intensity={22}
        color="#ffe6c7"
        distance={20}
        decay={2}
      />

      <group
        position={wide ? [1.5, -0.1, 0] : [0, -0.8, 0]}
        scale={wide ? 1 : 0.82}
      >
        <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.3} floatingRange={[-0.05, 0.05]}>
          <Cake wished={wished} />
        </Float>
      </group>

      <Balloons wide={wide} />
      <Dust />

      <Sparkles
        count={90}
        scale={[12, 7, 6]}
        size={2.4}
        speed={0.25}
        opacity={0.7}
        color="#ffe3b0"
      />

      <Effects />
    </>
  );
}

export default function Scene({ wished }: { wished: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.9]}
      camera={{ position: [0, 1.35, 6.2], fov: 42, near: 0.1, far: 300 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <World wished={wished} />
      </Suspense>
    </Canvas>
  );
}
