import React, { Suspense, lazy, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe2, ExternalLink } from "lucide-react";
import ContactCard from "./ContactCard";
import GlobeLoader from "./GlobeLoader";
import "./ContactMeMap.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// three.js + textures live in their own chunk so the form renders immediately.
const EarthScene = lazy(() => import("./EarthScene"));

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7066.988841507452!2d85.32366919999996!3d27.6711098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19daaaad1fb9%3A0xce05a6a8240aca9d!2sTangal%20Tole%2C%20Lalitpur%2044600!5e0!3m2!1sen!2snp!4v1709290723897!5m2!1sen!2snp";
const MAP_LINK_URL = "https://maps.google.com/?q=Tangal+Tole,+Lalitpur+44600";

const ContactMe = () => {
  const { t } = useTranslation();

  const [openMap, setOpenMap] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <div className="w-full px-4 sm:px-6 pt-28 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-6 md:mb-8"
      >
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase opacity-60 mb-2">
          {"// Get in touch"}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-3">
          Contact{" "}
          <span className="bg-(--secondary) bg-clip-text text-transparent">
            {t("me")}
          </span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed opacity-80">
          Idea Into Product — have a project in mind? Send a message, or spin
          the globe to see where I build from.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* LEFT — Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <ContactCard />
        </motion.div>

        {/* RIGHT — Earth / Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="relative h-[380px] sm:h-[440px] lg:h-auto lg:min-h-[480px] rounded-2xl overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, var(--glow-color), transparent 70%)",
            border: "1px solid var(--card-border)",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {openMap ? (
              <motion.div
                key="map"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <iframe
                  title="Google Map — Tangal, Lalitpur"
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: isDark ? "invert(90%) hue-rotate(180deg)" : "none",
                  }}
                  allowFullScreen
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <MapButton as="a" href={MAP_LINK_URL} target="_blank" rel="noreferrer">
                    <ExternalLink size={13} />
                    Open
                  </MapButton>
                  <MapButton onClick={() => setOpenMap(false)}>
                    <Globe2 size={13} />
                    Globe
                  </MapButton>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="globe"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Suspense fallback={<GlobeLoader />}>
                  <EarthScene onOpenMap={setOpenMap} />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const MapButton = ({ as: Tag = "button", children, ...props }) => (
  <Tag
    {...(Tag === "button" ? { type: "button" } : {})}
    {...props}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase backdrop-blur-md shadow-lg hover:-translate-y-0.5 transition-transform"
    style={{
      background: "color-mix(in srgb, var(--card) 85%, transparent)",
      border: "1px solid var(--card-border)",
      color: "var(--text)",
    }}
  >
    {children}
  </Tag>
);

export default ContactMe;
