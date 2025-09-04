import React from "react";
import LandEarth from "./LandEarth";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import ContactCard from "./ContactCard";

const ContactMe = () => {
  const FullScreenCanvas = styled.div`
    width: 100%;
    height: 100vh;
    background:#00040C
  `;
  const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <FullScreenCanvas>
      <Canvas>
        <LandEarth />
      </Canvas>
      <Overlay><ContactCard/></Overlay>
    </FullScreenCanvas>
  );
};

export default ContactMe;
