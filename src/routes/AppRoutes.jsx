import React, { Suspense, lazy, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "../components/Loader/Loader";
import InnerLoader from "../components/Loader/InnerLoader";
import CommandPalette from "../components/CommandPalette/CommandPalette";

// ---------- Normal Import ----------
import LandLayout from "../pages/LandLayout";

// lazy() that can also be fetched ahead of render via `.preload()`
const lazyPage = (load) => Object.assign(lazy(load), { preload: load });

// ---------- Lazy Imports ----------
const Home = lazyPage(() => import("../pages/Home.jsx"));
const AboutMe = lazyPage(() => import("../pages/AboutMe/AboutMe.jsx"));
const AboutMoreInfo = lazyPage(
  () => import("../pages/AboutMe/AboutMoreInfo.jsx"),
);
const Projects = lazyPage(() => import("../pages/Projects/Projects.jsx"));
const Experience = lazyPage(
  () => import("../pages/Expericence/Expericence.jsx"),
);
const ContactMe = lazyPage(
  () => import("../pages/ContactMe/ContactMe.jsx"),
);
const MyCV = lazy(() => import("../pages/MyCV.jsx"));

// ---------- VS Clone ----------
const VSLayout = lazyPage(() => import("../pages/VSClone/VSLayout.jsx"));

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
const MyPrivateDocument = lazyPage(
  () =>
    import(
      "../pages/MyPrivateDocument/MyPrivateDocument.jsx"
    ),
);

const AccessDocument = lazyPage(
  () =>
    import(
      "../pages/MyPrivateDocument/AccessDocument.jsx"
    ),
);

// Start downloading the landing page's chunk while the intro loader plays.
const preloadInitialPage = () => {
  const segment = window.location.hash.match(/^#\/?([^/?#]*)/)?.[1] ?? "";
  const pages = {
    "": [Home],
    "about-me": [AboutMe, AboutMoreInfo],
    projects: [Projects],
    experience: [Experience],
    "contact-me": [ContactMe],
    "vs-profile": [VSLayout],
    documents: [MyPrivateDocument],
    accessDoc: [AccessDocument],
  };
  return Promise.all((pages[segment] ?? []).map((page) => page.preload()));
};

const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialPage] = useState(preloadInitialPage);

  return (
    <HashRouter>
      {/* Loader fades out over the content instead of blocking its mount */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999]"
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Loader
              waitFor={initialPage}
              onComplete={() => setIsLoading(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.main
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <CommandPalette />

          <Suspense fallback={<InnerLoader />}>
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
          </Suspense>
        </motion.main>
      )}
    </HashRouter>
  );
};

export default AppRoutes;