import React, { Suspense, lazy, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "../components/Loader/Loader";
import InnerLoader from "../components/Loader/InnerLoader";
import CommandPalette from "../components/CommandPalette/CommandPalette";

// ---------- Normal Import ----------
import LandLayout from "../pages/LandLayout";

// ---------- Lazy Imports ----------
const Home = lazy(() => import("../pages/Home.jsx"));
const AboutMe = lazy(() => import("../pages/AboutMe/AboutMe.jsx"));
const AboutMoreInfo = lazy(
  () => import("../pages/AboutMe/AboutMoreInfo.jsx"),
);
const Projects = lazy(() => import("../pages/Projects/Projects.jsx"));
const Experience = lazy(
  () => import("../pages/Expericence/Expericence.jsx"),
);
const ContactMe = lazy(
  () => import("../pages/ContactMe/ContactMe.jsx"),
);
const MyCV = lazy(() => import("../pages/MyCV.jsx"));

// ---------- VS Clone ----------
const VSLayout = lazy(() => import("../pages/VSClone/VSLayout.jsx"));

const VsWelcome = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/VsWelcome.jsx"),
);

const MyInfoVs = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/MyInfoVs.jsx"),
);

const MyEducationVs = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/MyEducationVs.jsx"),
);

const MyProjects = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/MyProjects.jsx"),
);

const MyExperience = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/MyExperience.jsx"),
);

const MyContactsVs = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/MyContactsVs.jsx"),
);

const Vs404 = lazy(
  () => import("../pages/VSClone/VSBody/VsFolder/Vs404.jsx"),
);

const NotFound = lazy(() => import("../pages/NotFound.jsx"));

// ---------- Private Docs ----------
const MyPrivateDocument = lazy(
  () =>
    import(
      "../pages/MyPrivateDocument/MyPrivateDocument.jsx"
    ),
);

const AccessDocument = lazy(
  () =>
    import(
      "../pages/MyPrivateDocument/AccessDocument.jsx"
    ),
);

const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HashRouter>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
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
            <CommandPalette />

            {/* <Suspense fallback={<InnerLoader />}> */}
              <Routes>
                {/* Static Routes */}
                <Route path="cv.pdf" element={<MyCV />} />
                <Route path="loader" element={<Loader />} />

                {/* Main Website */}
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

                  <Route
                    path="projects"
                    element={<Projects />}
                  />

                  <Route
                    path="experience"
                    element={<Experience />}
                  />

                  <Route
                    path="contact-me"
                    element={<ContactMe />}
                  />

                  <Route
                    path="accessDoc"
                    element={<AccessDocument />}
                  />

                  <Route
                    path="documents"
                    element={<MyPrivateDocument />}
                  />

                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* VS Profile */}
                <Route
                  path="/vs-profile"
                  element={<VSLayout />}
                >
                  <Route index element={<VsWelcome />} />

                  <Route
                    path="my-infovs"
                    element={<MyInfoVs />}
                  />

                  <Route
                    path="my-educationvs"
                    element={<MyEducationVs />}
                  />

                  <Route
                    path="my-projectsvs"
                    element={<MyProjects />}
                  />

                  <Route
                    path="my-experiencevs"
                    element={<MyExperience />}
                  />

                  <Route
                    path="my-contactvs"
                    element={<MyContactsVs />}
                  />

                  <Route path="*" element={<Vs404 />} />
                </Route>

                {/* Global 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            {/* </Suspense> */}
          </motion.main>
        )}
      </AnimatePresence>
    </HashRouter>
  );
};

export default AppRoutes;