import React, { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

// 2K textures: plenty for a ~450px canvas and ~25x lighter than the 8K originals.
import EarthCloudsMap from "../../assets/textures/earth_clouds_2k.jpg";
import EarthDayMap from "../../assets/textures/earth_daymap_2k.jpg";
import EarthNormalMap from "../../assets/textures/earth_normal_2k.jpg";

const TARGET_POSITION = new THREE.Vector3(0, 0, 3);
const ZOOM_TARGET_SCALE = 2.2;

const LandEarth = ({ setOpenMap, onReady }) => {
  const [colorMap, normalMap, cloudsMap] = useLoader(THREE.TextureLoader, [
    EarthDayMap,
    EarthNormalMap,
    EarthCloudsMap,
  ]);

  const earthRef = useRef(null);
  const cloudsRef = useRef(null);

  // Animation state lives in refs so useFrame never triggers a React re-render.
  const scale = useRef(0.1);
  const isZooming = useRef(false);
  const mapOpened = useRef(false);

  useEffect(() => {
    onReady?.();
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [onReady]);

  useFrame((_, delta) => {
    const earth = earthRef.current;
    const clouds = cloudsRef.current;
    if (!earth || !clouds) return;

    // Normalise to ~1 per frame at 60fps so speed is frame-rate independent.
    const step = Math.min(delta, 0.05) * 60;

    earth.position.lerp(TARGET_POSITION, 0.05 * step);
    clouds.position.copy(earth.position);

    if (isZooming.current) {
      scale.current = Math.min(scale.current + 0.03 * step, ZOOM_TARGET_SCALE);
      if (scale.current >= ZOOM_TARGET_SCALE && !mapOpened.current) {
        mapOpened.current = true;
        setOpenMap(true);
      }
    } else {
      // Ease-out grow-in on first appearance
      scale.current += (1 - scale.current) * 0.06 * step;
      earth.rotation.y += 0.004 * step;
    }

    earth.scale.setScalar(scale.current);
    clouds.scale.setScalar(scale.current);
    clouds.rotation.y += 0.005 * step;
  });

  return (
    <>
      <ambientLight intensity={1.4} />
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={15.2} />

      {/* Clouds */}
      <mesh ref={cloudsRef} scale={0.1}>
        <sphereGeometry args={[1.2, 48, 48]} />
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
        scale={0.1}
        onClick={(e) => {
          e.stopPropagation();
          isZooming.current = true;
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <sphereGeometry args={[1.19, 48, 48]} />
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
