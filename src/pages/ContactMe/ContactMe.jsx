import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import LandEarth from "./LandEarth";
import ContactCard from "./ContactCard";
import "./ContactMeMap.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: var(--glow-color);
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
  const { t } = useTranslation();

  const [openMap, setOpenMap] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <div>
      <h2
        className="
          text-3xl sm:text-4xl md:text-5xl
          font-extrabold leading-tight
          mb-3 md:mb-4
        "
      >
        Contact{" "}
        <span className="bg-(--secondary) bg-clip-text text-transparent">
          {t("me")}
        </span>
      </h2>

      <p className="text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mb-2">
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7066.988841507452!2d85.32366919999996!3d27.6711098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19daaaad1fb9%3A0xce05a6a8240aca9d!2sTangal%20Tole%2C%20Lalitpur%2044600!5e0!3m2!1sen!2snp!4v1709290723897!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ filter: isDark ? "invert(100%)" : "none" }}
                allowFullScreen=""
                loading="lazy"
                // referrerPolicy="no-referrer-when-downgrade"
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
