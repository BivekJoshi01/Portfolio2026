import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import Moon from "../../assets/textures/Moon.png";

import { TextureLoader } from "three";

const LandEarth = () => {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );
  const [moon] = useLoader(TextureLoader, [Moon]);

  const earthRef = useRef(null);
  const cloudsRef = useRef(null);
  const smallSphereRef = useRef(null);
  const controlsRef = useRef(null);

  const [earthScale, setEarthScale] = useState(0.1);
  const [cloudsScale, setCloudsScale] = useState(0.1);

  const targetPosition = [-1.6, 0, 4.3];

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (earthRef.current && cloudsRef.current) {
      earthRef.current.position.lerp(
        new THREE.Vector3(...targetPosition),
        0.05
      );
      cloudsRef.current.position.lerp(
        new THREE.Vector3(...targetPosition),
        0.05
      );
    }

    if (earthRef.current) {
      if (earthScale < 1) setEarthScale((prev) => Math.min(prev + 0.01, 1));

      // Smooth auto-rotation when user is not dragging
      if (!controlsRef.current?.userIsDragging) {
        earthRef.current.rotation.y += 0.002; // slower auto rotation
      }
    }

    if (cloudsRef.current) {
      if (cloudsScale < 1) setCloudsScale((prev) => Math.min(prev + 0.01, 1));
      cloudsRef.current.rotation.y += 0.0025;
    }

    // Orbiting small sphere
    if (smallSphereRef.current && earthRef.current) {
      const radius = 2;
      const speed = 0.5;
      const rotationSpeed = 0.2;

      smallSphereRef.current.position.x =
        earthRef.current.position.x + radius * Math.cos(elapsedTime * speed);
      smallSphereRef.current.position.z =
        earthRef.current.position.z + radius * Math.sin(elapsedTime * speed);
      smallSphereRef.current.position.y =
        earthRef.current.position.y + Math.sin(elapsedTime * 0.5);

      smallSphereRef.current.rotation.y += rotationSpeed * 0.01; // slower rotation
    }
  });

  return (
    <>
      <ambientLight intensity={1.4} />
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={15.2} />

      {/* Clouds */}
      <mesh ref={cloudsRef} scale={[cloudsScale, cloudsScale, cloudsScale]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Earth */}
      <mesh ref={earthRef} scale={[earthScale, earthScale, earthScale]}>
        <sphereGeometry args={[1.19, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>

      {/* Moon / small sphere */}
      <mesh ref={smallSphereRef} scale={[0.6, 0.6, 0.6]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial map={moon} />
      </mesh>

    </>
  );
};

export default LandEarth;
