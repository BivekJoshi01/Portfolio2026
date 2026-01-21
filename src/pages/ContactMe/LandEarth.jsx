import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import EarthDayMap from "../../assets/textures/8k_earth_daymap.png";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";

import { TextureLoader } from "three";

const LandEarth = ({ setOpenMap }) => {
  const [isZooming, setIsZooming] = useState(false);
  const zoomTargetScale = 2.2; // how big earth gets
  const zoomSpeed = 0.01;

  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap],
  );

  const earthRef = useRef(null);
  const cloudsRef = useRef(null);
  const controlsRef = useRef(null);

  const [earthScale, setEarthScale] = useState(0.1);
  const [cloudsScale, setCloudsScale] = useState(0.1);

  const targetPosition = [0, 0, 3];

  useFrame(({}) => {
    if (earthRef.current && cloudsRef.current) {
      earthRef.current.position.lerp(
        new THREE.Vector3(...targetPosition),
        0.05,
      );
      cloudsRef.current.position.lerp(
        new THREE.Vector3(...targetPosition),
        0.05,
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
  });

  useFrame(() => {
    if (!earthRef.current || !cloudsRef.current) return;

    // Move to target position
    earthRef.current.position.lerp(new THREE.Vector3(...targetPosition), 0.05);
    cloudsRef.current.position.lerp(new THREE.Vector3(...targetPosition), 0.05);

    // Initial grow animation
    if (!isZooming && earthScale < 1) {
      setEarthScale((prev) => Math.min(prev + 0.01, 1));
      setCloudsScale((prev) => Math.min(prev + 0.01, 1));
    }

    // Zoom-in animation after click
    if (isZooming) {
      setEarthScale((prev) => {
        const next = Math.min(prev + zoomSpeed, zoomTargetScale);

        // When zoom finishes → open map after delay
        if (next >= zoomTargetScale) {
          setTimeout(() => {
            setOpenMap(true);
          }, 1);
        }

        return next;
      });

      setCloudsScale((prev) => Math.min(prev + zoomSpeed, zoomTargetScale));
    }

    // Auto rotation only when not zooming
    if (!isZooming && !controlsRef.current?.userIsDragging) {
      earthRef.current.rotation.y += 0.002;
    }

    cloudsRef.current.rotation.y += 0.0025;
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
      <mesh
        ref={earthRef}
        scale={[earthScale, earthScale, earthScale]}
        onClick={(e) => {
          e.stopPropagation();
          setIsZooming(true); // start zoom animation
        }}
      >
        <sphereGeometry args={[1.19, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>

      <OrbitControls
        enableRotate={true}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        target={[0, 0, 3]}
      />
    </>
  );
};

export default LandEarth;
