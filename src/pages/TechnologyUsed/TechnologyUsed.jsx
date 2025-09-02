import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Image, Line } from "@react-three/drei";
import * as THREE from "three";
import { Line2, LineSegments2 } from "three-stdlib";
import Figma from "../../assets/Icons/Figma.svg";
import Git from "../../assets/Icons/Git.svg";
import GitHub from "../../assets/Icons/GitWhite.svg";
import GitLab from "../../assets/Icons/GitLab.svg";
import Html from "../../assets/Icons/Html.svg";
import Php from "../../assets/Icons/Php.svg";
import ReactJs from "../../assets/Icons/ReactJs.svg";
import TS from "../../assets/Icons/TS.svg";
import ThreeJs from "../../assets/Icons/ThreeJs.svg";
import StoryBook from "../../assets/Icons/StoryBook.svg";
import Tailwind from "../../assets/Icons/Tailwind.svg";
import MUI from "../../assets/Icons/MUI.svg";
import NodeJs from "../../assets/Icons/NodeJs.svg";
import MongoDB from "../../assets/Icons/MongoDB.svg";

const TechnologyUsed = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <Sphere />
      </Canvas>
    </div>
  );
};

const Sphere = () => {
  const meshRef = useRef(null);
  const lineRefs = useRef([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const currentPositions = useRef([]);
  const targetPositions = useRef([]);
  const rotationSpeed = useRef({ x: 0.002, y: 0.005 });

  const techItems = [
    { name: "Figma", icon: Figma, color: "#F24E1E", isImage: true, scale: 0.8 },
    { name: "Git", icon: Git, color: "#F05032", isImage: true, scale: 0.8 },
    { name: "Git Hub", icon: GitHub, color: "#181717", isImage: true, scale: 0.8 },
    { name: "Git Lab", icon: GitLab, color: "#FC6D26", isImage: true, scale: 0.8 },
    { name: "HTML", icon: Html, color: "#E34F26", isImage: true, scale: 0.8 },
    { name: "PHP", icon: Php, color: "#777BB4", isImage: true, scale: 0.8 },
    { name: "React.Js", icon: ReactJs, color: "#61DAFB", isImage: true, scale: 0.8 },
    { name: "Typescript", icon: TS, color: "#3178C6", isImage: true, scale: 0.8 },
    { name: "Three.Js", icon: ThreeJs, color: "#FFFFFF", isImage: true, scale: 0.8 },
    { name: "TailwindCss", icon: Tailwind, color: "#06B6D4", isImage: true, scale: 0.8 },
    { name: "StoryBook", icon: StoryBook, color: "#FF4785", isImage: true, scale: 0.8 },
    { name: "Material UI", icon: MUI, color: "#007FFF", isImage: true, scale: 0.8 },
    { name: "Node.Js", icon: NodeJs, color: "#339933", isImage: true, scale: 0.8 },
    { name: "MongoDB", icon: MongoDB, color: "#47A248", isImage: true, scale: 0.8 },
  ];

  const positions = useMemo(() => {
    const pos = [];
    const radius = 3.5;
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < techItems.length; i++) {
      const y = 1 - (i / (techItems.length - 1)) * 2;
      const radiusAtY = radius * Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      pos.push(new THREE.Vector3(x, y * radius, z));
    }
    return pos;
  }, [techItems.length]);

  if (!initialized) {
    targetPositions.current = [...positions];
    currentPositions.current = positions.map((p) => p.clone());
    setInitialized(true);
  }

  const connections = useMemo(() => {
    const curvedLines = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < 5) {
          curvedLines.push([i, j]);
        }
      }
    }
    return curvedLines;
  }, [positions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (!meshRef.current) return;

    const targetY = hoveredItem === null ? 0.005 : 0;
    const targetX = hoveredItem === null ? 0.002 : 0;

    rotationSpeed.current.y += (targetY - rotationSpeed.current.y) * 0.05;
    rotationSpeed.current.x += (targetX - rotationSpeed.current.x) * 0.05;

    meshRef.current.rotation.y += rotationSpeed.current.y;
    meshRef.current.rotation.x += rotationSpeed.current.x;

    currentPositions.current.forEach((pos, idx) => {
      const target =
        hoveredItem === idx
          ? new THREE.Vector3(0, 0, 0)
          : hoveredItem === null
          ? positions[idx]
          : positions[idx].clone().multiplyScalar(1.5);

      pos.lerp(target, 0.1);
    });

    lineRefs.current.forEach((line, idx) => {
      if (!line) return;
      const material = line.material;
      if (material.opacity !== undefined) {
        material.opacity = 0.2 + 0.2 * Math.sin(t * 3 + idx);
        material.needsUpdate = true;
      }
    });
  });

  const handleHover = (index) => {
    setHoveredItem(index);
  };

  return (
    <group ref={meshRef}>
      {connections.map(([i, j], index) => {
        const start = currentPositions.current[i];
        const end = currentPositions.current[j];
        if (!start || !end) return null;

        const mid = start.clone().add(end).multiplyScalar(0.5);
        mid.y += 0.5;

        const curve = new THREE.CatmullRomCurve3([start, mid, end]);
        const points = curve.getPoints(20);

        return (
          <Line
            key={index}
            points={points}
            color="#61dafb"
            transparent
            opacity={0.4}
            depthTest={true}
            depthWrite={false}
            ref={(el) => {
              lineRefs.current[index] = el;
            }}
          />
        );
      })}

      {techItems.map((tech, i) => {
        const pulse =
          hoveredItem === i ? 1 + 0.05 * Math.sin(Date.now() * 0.005) : 1;

        return (
          <group
            key={i}
            position={currentPositions.current[i]}
            onPointerOver={(e) => {
              e.stopPropagation();
              handleHover(i);
            }}
            onPointerOut={() => handleHover(null)}
          >
            <BillboardElement>
              {tech.isImage ? (
                <Image
                  url={tech.icon}
                  scale={
                    hoveredItem === i
                      ? (tech.scale || 0.8) * 2 * pulse
                      : tech.scale || 0.8
                  }
                  transparent
                  opacity={0.9}
                  toneMapped={false}
                />
              ) : (
                <Text
                  fontSize={hoveredItem === i ? 0.6 * pulse : 0.3}
                  color={hoveredItem === i ? tech.color : "#ffffff"}
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={hoveredItem === i ? 0.08 : 0.02}
                  outlineColor={hoveredItem === i ? "#ffffff" : "#000000"}
                >
                  {tech.icon}
                </Text>
              )}
              <Text
                position={[0, hoveredItem === i ? -1 : -0.6, 0]}
                fontSize={0.3}
                color={tech.color}
                anchorX="center"
                anchorY="top"
                outlineWidth={0.02}
                outlineColor="#000000"
              >
                {tech.name}
              </Text>
            </BillboardElement>
          </group>
        );
      })}
    </group>
  );
};

const BillboardElement = ({ children }) => {
  const ref = useRef(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.lookAt(camera.position);
    ref.current.up.set(0, 1, 0);
  });

  return <group ref={ref}>{children}</group>;
};

export default TechnologyUsed;
