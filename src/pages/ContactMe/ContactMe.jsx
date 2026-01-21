import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import LandEarth from "./LandEarth";
import ContactCard from "./ContactCard";
import "./ContactMeMap.css";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: white;
  border-radius: 16px;
  overflow: hidden;
`;

const Left = styled.div`
  flex: 1 1 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
`;

const Right = styled.div`
  flex: 1 1 400px;
  width: 100%;
  height: 450px;
  min-width: 300px;
`;

const ContactMe = () => {
  const [openMap, setOpenMap] = useState(false);
  return (
    <div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-6">
        Contact{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Me
        </span>
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-xl">
       Idea Into Product 
      </p>

      <Wrapper>
        {/* LEFT — Contact */}
        <Left>
          <ContactCard />
        </Left>

        {/* RIGHT — Earth */}
        <Right>
          {openMap ? (
            <div className="w-full h-full">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.124394665182!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1909f76f4e51%3A0xf14b6f4b2e2d2d7!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          ) : (
            <Canvas>
              <LandEarth setOpenMap={setOpenMap} />
            </Canvas>
          )}
        </Right>
      </Wrapper>
    </div>
  );
};

export default ContactMe;
