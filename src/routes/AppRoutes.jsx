import React, { Suspense, lazy, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { AnimatePresence, motion } from "framer-motion";
import InnerLoader from "../components/Loader/InnerLoader";

// --- Lazy Load Components ---
import LandLayout from "../pages/LandLayout";

const Home = lazy(() => import("../pages/Home"));
const AboutMe = lazy(() => import("../pages/AboutMe/AboutMe"));
const AboutMoreInfo = lazy(() => import("../pages/AboutMe/AboutMoreInfo"));
const Projects = lazy(() => import("../pages/Projects/Projects"));
const Experience = lazy(() => import("../pages/Expericence/Expericence"));
const ContactMe = lazy(() => import("../pages/ContactMe/ContactMe"));
const MyCV = lazy(() => import("../pages/MyCV"));

// VS Clone Section
const VSLayout = lazy(() => import("../pages/VSClone/VSLayout"));
const MyInfoVs = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/MyInfoVs"),
);
const MyEducationVs = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/MyEducationVs"),
);
const MyProjects = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/MyProjects"),
);
const MyExperience = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/MyExperience"),
);
const MyContactsVs = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/MyContactsVs"),
);

// Documents Section
const MyPrivateDocument = lazy(
  () => import("../pages/MyPrivateDocument/MyPrivateDocument"),
);
const AccessDocument = lazy(
  () => import("../pages/MyPrivateDocument/AccessDocument"),
);

const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <HashRouter>
      {/* The Suspense boundary shows your Loader while 
        the lazy components are being fetched 
      */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }} // Smooth zoom-out fade
            transition={{ duration: 0.8 }}
          >
            <Loader onComplete={() => setIsLoading(false)} />
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <Routes>
              <Route path="cv.pdf" element={<MyCV />} />
              <Route path="loader" element={<Loader />} />

              <Route path="/" element={<LandLayout />}>
                <Route index element={<Home />} />
                <Route
                  path="about-me"
                  element={
                    <div className="flex flex-col gap-3">
                      <div className="mt-30">
                        <AboutMe />
                      </div>
                      <AboutMoreInfo />
                    </div>
                  }
                />
                <Route path="projects" element={<Projects />} />
                <Route path="experience" element={<Experience />} />
                <Route path="contact-me" element={<ContactMe />} />
                <Route path="accessDoc" element={<AccessDocument />} />
                <Route path="documents" element={<MyPrivateDocument />} />
              </Route>

              <Route path="/vs-profile" element={<VSLayout />}>
                <Route index element={<MyInfoVs />} />
                <Route path="my-infovs" element={<MyInfoVs />} />
                <Route path="my-educationvs" element={<MyEducationVs />} />
                <Route path="my-projectsvs" element={<MyProjects />} />
                <Route path="my-experiencevs" element={<MyExperience />} />
                <Route path="my-contactvs" element={<MyContactsVs />} />
              </Route>
            </Routes>
          </motion.main>
        )}
      </AnimatePresence>
    </HashRouter>
  );
};

export default AppRoutes;
